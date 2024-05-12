


# systemd agent config

```ps
/media/sf_SHARED/Djohodo/Agent/Linux/agent.py
```

```
sudo nano /etc/systemd/system/myagent.service
```

```
[Unit]
Description=Mon Agent de Service
After=network.target

[Service]
Type=simple
User=<nom_utilisateur>
ExecStart=/usr/bin/python3 /chemin/vers/myagent.py
Restart=on-failure

[Install]
WantedBy=multi-user.target
```


```
sudo systemctl daemon-reload

sudo systemctl enable myagent.service

sudo systemctl start myagent.service

sudo systemctl status myagent.service

sudo journalctl -u myagent.service
```
