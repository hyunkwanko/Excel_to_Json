my_list = []
f = open("Data.txt", 'r')
lines = f.readlines()
for line in lines:
    # print(line.split())
    for i in range(len(line.split())):
        # print(line.split()[i])
        list.append(my_list, line.split()[i])

for i in range(len(my_list)):
    print(my_list[i])


# print(line.split())
f.close()
