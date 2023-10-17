import eel

from typing import List, Dict
import json
import socket
import os

from scan import tcp


eel.init('front')
    
@eel.expose
def tcp_check_ports_open_default(host: str, ports: List[int]) -> List[int]:
    try:
        socket.gethostbyname(host)
    except:
        return "error"

    open_port_list = []
    open_port_service_list = []
    for port in ports:
        if tcp.tcp_check_port_open_default(host, port):
            open_port_list.append(port)
            open_port_service_list.append(tcp.tcp_check_port_service(port))
    
    return open_port_list, open_port_service_list

@eel.expose
def tcp_syn_scan_ports_default(host: str, ports: List[int]) -> List[int]:
    try:
        socket.gethostbyname(host)
    except:
        return "error"

    open_port_list = []
    open_port_service_list = []
    for port in ports:
        if tcp.tcp_syn_scan_port_default(host, port):
            open_port_list.append(port)
            open_port_service_list.append(tcp.tcp_check_port_service(port))
    
    return open_port_list, open_port_service_list

@eel.expose
def write_to_json(label: str, ip_address: str, open_ports: List[int], time: str) -> None:
    json_file_path = os.path.join(os.path.expanduser('~'), 'MiniScan', 'scan_history.json')
    data = {"label": label, "ipAddress": ip_address, "openPorts": open_ports, "time": time}

    json_data = json.dumps(data)
    with open(json_file_path, 'a') as js_file:
        js_file.write(json_data + '\n')
    js_file.close()

@eel.expose
def read_from_json():
    data_dir = os.path.join(os.path.expanduser('~'), 'MiniScan')
    if not os.path.exists(data_dir):
        os.mkdir(data_dir)

    json_file_path = os.path.join(data_dir, 'scan_history.json')
    if not os.path.exists(json_file_path):
        with open(json_file_path, 'w') as file:
            file.write('')
            file.close()
    
    js_file = open(json_file_path, 'r')

    json_lines = js_file.readlines()
    json_lines = [line.strip() for line in json_lines]

    return json_lines
    
        
eel.start('index.html')
