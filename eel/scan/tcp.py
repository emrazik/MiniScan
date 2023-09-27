import socket
from typing import List, Dict

def tcp_check_port_open_default(host: str, port: int) -> bool:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)

    try:
        sock.connect((host, port))
        sock.close()
        return True
    except (TimeoutError, ConnectionRefusedError):
        sock.close()
        return False
    
def tcp_check_ports_open_default(host: str, ports: List[int], config: Dict[str, any]) -> None:
    for port in ports:
        if tcp_check_port_open_default(host, port):
            print("Port {} is open".format(port))
        else:
            if config["verbose"]:
                print("Port {} is closed".format(port))

def tcp_check_port_service(port: int) -> str:
    return socket.getservbyport(port)
