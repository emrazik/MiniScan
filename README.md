# MiniScan
MiniScan is a small port scanner with a clean and simple GUI. It offers basic TCP scanning, SYN scanning, and a searchable history of scans.

## Installation
### MacOS
Download the app [here](https://github.com/emrazik/MiniScan/releases)

Right now, the packaged app is only available on MacOS. I will add other operating systems in the future.

### Windows, Linux, or The Link Didn't Work
Sorry if any of these situations happened. I still need to test the release on MacOS and other systems. You can do this:

```
git clone https://github.com/emrazik/MiniScan.git
python3 -m venv scanenv
source scanenv/bin/activate
pip install eel scapy
cd eel
python app.py
```

This should hopefully run the app!


:warning: This is a small learning project. Use at your own risk. It hasn't been designed to obfuscate traffic.

:warning: This is strictly for educational purposes. Don't use it on systems without the owner's permissions.