# Debian

## Basic linux
* ls, pwd, cat, cd, cp, rm, mkdir, rmdir
* whoami, whereis, which
* source
* adduser
* chown, chmod, chroot
* reboot, shutdown
* su
* tar, unzip
* wc
* less, nano, xxd
* wget, curl

## File utils
* diff
* grep
* find
* cut
* sed

## Process utils
* top
* kill, killall
* ps aux
* lsof
* Ctrl-z to send process to background
* jobs will show background processes
* fg will bring them back

## Apt
* apt update
* apt list --installed
* apt full-upgrade
* apt install
* apt remove
* apt autoremove
* apt clean
* DEBIAN_FRONTEND=noninteractive apt (to no get any post install questions)
* --no-install-recommends (defaults to true otherwise)
* -y (automatically select yes)

## Fdisk, mkfs.ext4
* fdisk -l
* fdisk /dev/sda
* p to print, n to create new one, d to delete, a to make bootable, w to write
* mkfs.ext4 /dev/sda1

## Disk utils
* df -h (show filesystems, sizes, used, mounted)
* lsblk (show block devices)
* du -sh (disk space of files/folders)
* mount
* umount /mnt/boot

## LVM
* pvdisplay, vgdisplay, lvdisplay
* pvcreate, vgcreate, lvcreate
* pvresize, lvresize
* to snapshot lvm volume
* lvcreate --size 40G --snapshot --name backup_snapshot /dev/mapper/decrypt-root
* now when we copy root, any write changes will go to snapshot

* to revert volume to state before snapshot(must reboot if volume is active)
* lvconvert --merge /dev/mapper/decrypt-root
* this will delete snapshot once we reboot

* to apply changes during snapshot and remove
* lvremove /dev/mapper/backup_snapshot

## Networking utils
* ip link (show network interfaces)
* ip link set eth0 up (bring up interface)
* dhclient (will set up dhcp)
* netstat
* iptables

## SystemD
* systemctl status service
* systemd-nspawn
* journal -xb

## QEMU
* apt install qemu qemu-user-static
* cp /usr/bin/qemu-arm-static bootstrap/usr/bin

## Printer
* apt install cups hplip 
* hp-scan
* http://localhost:631

