"""
for i = 0 to n:
    a[i]부터 a[n - 1]까지 차례로 비교하여 가장 작은 값이 a[j]에 있다고 하자.
    a[i]와 a[j]의 값을 서로 맞바꾼다.
"""

A = [64, 25, 12, 22, 11]

for i in range(len(A)):
    print("%d" %A[i], end=' ')
print()

for i in range(len(A)):
    min_idx = i
    for j in range(i+1, len(A)):
        if A[min_idx] > A[j]:
            min_idx = j

    A[i], A[min_idx] = A[min_idx], A[i] # Swap

print("Sorted array")
for i in range(len(A)):
    print("%d" %A[i], end=' ')
