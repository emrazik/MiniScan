import socket
from typing import List, Dict
from scapy.all import *

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

def tcp_syn_scan_port_default(host: str, port: int) -> bool:
    send_port = RandShort()
    target_ip = socket.gethostbyname(host)
    ip_packet = IP(dst=target_ip)
    tcp_packet = TCP(sport=send_port, dport=port, flags="S")

    packet = ip_packet / tcp_packet

    response = sr1(packet, timeout=2)
    if response:
        flags = response.getlayer(TCP).flags
        if flags == 0x12:
            output = True
        else:
            output = False

        RST = IP(dst=target_ip)/TCP(sport=send_port, dport=port, flags="R")
        send(RST)
    else:
        #TODO add filtered option in addition to True/False (Open/Closed)
        return False

    return output
