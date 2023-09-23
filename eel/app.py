import eel

from typing import List, Dict
import json
import socket

from scan import tcp


eel.init('front')
    
@eel.expose
def tcp_check_ports_open_default(host: str, ports: List[int]) -> List[int]:
    try:
        socket.gethostbyname(host)
    except:
        return "error"

    open_port_list = []
    for port in ports:
        if tcp.tcp_check_port_open_default(host, port):
            open_port_list.append(port)
    
    return open_port_list

@eel.expose
def write_to_json(label: str, ip_address: str, open_ports: List[int], time: str) -> None:
    data = {
        "label": label,
        "ipAddress": ip_address,
        "openPorts": open_ports,
        "time": time
    }

    json_data = json.dumps(data, indent=4)
    json_file_path = '../storage/scan_history.json'

    with open(json_file_path, 'a') as js_file:
        js_file.write(json_data + '\n')
        
eel.start('index.html')
