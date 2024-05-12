import os
import time
import socket
import requests
from datetime import datetime
import psutil

server_url = "https://inspired-strictly-starling.ngrok-free.app"
log_paths = [
    "/var/log/auth.log",
    "/var/log/boot.log",
]

registered_route = '/api/v1/agents'
log_routes = '/api/v1/agents/info/logs'
process_routes = '/api/v1/agents/info/process'
network_routes = '/api/v1/agents/info/network'

class ParsedData:
    def __init__(self, timestamp, user, service, content):
        self.timestamp = timestamp
        self.user = user
        self.service = service
        self.content = content

def register_agent(server_url, agent_name, ip):
    url = f"{server_url}{registered_route}"
    payload = {'agent_name': agent_name, 'ip': ip}
    response = requests.post(url, json=payload)
    if response.ok:
        json_response = response.json()
        return json_response.get('key')
    else:
        response.raise_for_status()

def monitor_log_files(log_paths, server_url, key):
    last_sent_time = {}
    all_log_entries = {}
    print("Monitoring log files...")

    while True:
        current_time = time.time()
        for log_file_path in log_paths:
            log_file_name = os.path.basename(log_file_path)
            if log_file_name not in last_sent_time or \
               current_time - last_sent_time[log_file_name] >= 3 * 60 * 60:
                print(f"Processing log file: {log_file_name}")
                log_entries = []

                with open(log_file_path, 'r') as file:
                    lines = file.readlines()

                for line in lines:
                    parsed_data = parse_log_entry(line, log_file_name)
                    if parsed_data:
                        log_entries.append(parsed_data)

                if log_entries:
                    if log_file_name not in all_log_entries:
                        all_log_entries[log_file_name] = []

                    all_log_entries[log_file_name].extend(log_entries)
                    last_sent_time[log_file_name] = current_time

        if all_log_entries:
            print("Sending log entries to server...")
            send_data_to_server(server_url, all_log_entries, key)
            all_log_entries.clear()

        time.sleep(1)

def parse_log_entry(log_entry, log_file_name):
    parts = log_entry.split()
    if log_file_name == "auth.log":
        timestamp = format_timestamp(parts[0], parts[1], parts[2])
        user = parts[3]
        service = parts[4].rstrip(':')
        content = " ".join(parts[5:])
        return {
            "timestamp": timestamp,
            "user": user,
            "service": service,
            "content": content,
        }
    elif log_file_name == "boot.log":
        try:
            status, rest_of_line = log_entry.strip().split(']', 1)
            status = status.strip('[').strip()
            state, content = rest_of_line.strip().split(' ', 1)
            return {
                "status": status,
                "state": state,
                "content": content.strip(),
            }
        except ValueError:
            return None
    else:
        return None

def format_timestamp(month_str, date_str, hour_str):
    clean_month_str = month_str.replace('\x00', '')
    clean_date_str = date_str.replace('\x00', '')
    clean_hour_str = hour_str.replace('\x00', '')
    current_year = datetime.now().year
    timestamp = datetime.strptime(f"{clean_month_str} {clean_date_str} {clean_hour_str}", "%b %d %H:%M:%S")
    return timestamp.isoformat()

def send_data_to_server(server_url, data, key):
    url = f"{server_url}{log_routes}"
    headers = {'key': key}
    payload = data
    response = requests.post(url, json=payload, headers=headers)
    if not response.ok:
        response.raise_for_status()
    else:
        print("Log entries sent successfully.")

def get_public_ip():
    response = requests.get('https://httpbin.org/ip')
    response.raise_for_status()
    return response.json()['origin']

def get_running_processes():
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'username']):
        try:
            process_info = proc.info
            processes.append(process_info)
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return processes

def post_process_logs(server_url, key, processes):
    headers = {'key': key}
    print(headers)
    data = {"processes": processes}
    response = requests.post(f"{server_url}{process_routes}", json=data, headers=headers)
    if not response.ok:
        response.raise_for_status()
    else:
        print("Processes data sent successfully.")

def read_or_register_key(server_url, agent_name, ip):
    key_file_path = '.myhiddenkey'
    try:
        with open(key_file_path, 'r') as key_file:
            key = key_file.read().strip()
            if key:
                print(f"Key found in {key_file_path}: {key}")
                return key
    except FileNotFoundError:
        print(f"No key file found. Registering agent...")

    key = register_agent(server_url, agent_name, ip)
    if not key:
        raise Exception("Failed to register agent with the server.")
    print(f"Agent registered with key: {key}")

    with open(key_file_path, 'w') as key_file:
        key_file.write(key)

    return key

if __name__ == "__main__":
    
    print('Starting the agent...')
    processes = get_running_processes()
    agent_name = socket.gethostname()
    ip = get_public_ip()

    print(f"Agent name: {agent_name}, IP: {ip}")
    key = read_or_register_key(server_url, agent_name, ip)

    print(f"Using key: {key}")
    post_process_logs(server_url, key, processes)    
    monitor_log_files(log_paths, server_url, key)
