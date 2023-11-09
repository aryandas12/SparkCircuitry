from lcapy import Circuit

netlist = "V 1 0 6; down=1.5 \n R1 1 2 2; right=1.5 \n R2 2 0_2 4; down \n W 0 0_2; right"

a = Circuit(netlist)

print(a[2].v)