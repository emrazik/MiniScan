import eel
from typing import List, Dict
from scan import tcp

eel.init('front')
    
@eel.expose
def tcp_check_ports_open_default(host: str, ports: List[int]) -> List[int]:
    open_port_list = []
    for port in ports:
        if tcp.tcp_check_port_open_default(host, port):
            open_port_list.append(port)
    
    return open_port_list

eel.start('index.html')
