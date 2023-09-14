from scan import tcp

def main():
    HOST = "google.com"

    config = {
        "verbose": True,
    }

    tcp.tcp_check_ports_open_default(HOST, [80, 81, 443], config)

if __name__ == "__main__":
    main()
