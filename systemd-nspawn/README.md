# Sandbox Setup

## Systemd Containers
* `apt install systemd-container`
* `apt install debootstrap`
* create a new minimal debian os, `mkdir bootstrap` `debootstrap --variant=minbase stable bootstrap`
* need to be root to copy bootstrap, `cp -Rp bootstrap test`
* spawn container `systemd-nspawn -D bootstrap`

### Systemd-nspawn Options
* `-u c` (user)
* `--chdir=/home/c`
* `--register=no`

### Systemd-nspawn X11
* for X11 access from container, first allow local xserver access with `xhost +local:`(not sure we still need this)
```
--setenv=DISPLAY=$DISPLAY --bind-ro=/tmp/.X11-unix
```

### Systemd-nspawn Wayland
```
--setenv=XDG_RUNTIME_DIR=/container/$XDG_RUNTIME_DIR --setenv=WAYLAND_DISPLAY=$WAYLAND_DISPLAY --bind-ro=$XDG_RUNTIME_DIR/$WAYLAND_DISPLAY:/container/$XDG_RUNTIME_DIR/$WAYLAND_DISPLAY
```

### Systemd-nspawn PulseAudio
```
--bind-ro=/dev/snd --bind-ro=$XDG_RUNTIME_DIR/pulse:/container/$XDG_RUNTIME_DIR/pulse --setenv=PULSE_SERVER=/container/$XDG_RUNTIME_DIR/pulse/native
```

### Systemd-nspawn Gnome3 Shell
* `-b` need to boot
* `--bind=/dev/tty1`
* `--bind=/dev/dri/card0`
* `--bind=/run/udev`
* `--bind=/dev/input`
* `--property='DeviceAllow=/dev/input/event0 rw'`
* `--property='DeviceAllow=/dev/input/event1 rw'`

### Systemd-nspawn capabillities
* `--capability=CAP_NET_ADMIN` to let container create tunnels and manage net stuff
* `--private-network` to remove networking, unfortunally X11 needs this...
* drop all capabilities with `--drop-capability=CAP_AUDIT_CONTROL,CAP_AUDIT_WRITE,CAP_CHOWN,CAP_DAC_OVERRIDE,CAP_DAC_READ_SEARCH,CAP_FOWNER,CAP_FSETID,CAP_IPC_OWNER,CAP_KILL,CAP_LEASE,CAP_LINUX_IMMUTABLE,CAP_MKNOD,CAP_NET_BIND_SERVICE,CAP_NET_BROADCAST,CAP_NET_RAW,CAP_SETFCAP,CAP_SETGID,CAP_SETPCAP,CAP_SETUID,CAP_SYS_ADMIN,CAP_SYS_BOOT,CAP_SYS_CHROOT,CAP_SYS_NICE,CAP_SYS_PTRACE,CAP_SYS_RESOURCE,CAP_SYS_TTY_CONFIG,CAP_NET_ADMIN`

