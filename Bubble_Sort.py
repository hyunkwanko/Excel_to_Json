def bubbleSort(arr):
    n = len(arr)
    print(n)
    for i in range(0, n): # 0 ~ n - 1
        for j in range(0, n-i-1):
            print(i, j)
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]


arr =[5,6,7,21,2,3,4,6]

bubbleSort(arr)

print("결과:", end=" ")
for i in range(len(arr)):
    print(arr[i], end=" ")