"""
全部着法为0~2**(r*c)
遍历此着法即可
"""


def solve(r, c):
    init_state = int('0' * (r * c))
    target_state = int('1' * (r * c), 2)
    sha = [0] * (r * c)
    for i in range(r):
        for j in range(c):
            s = 0
            for dx, dy in ((0, 0), (0, 1), (0, -1), (1, 0), (-1, 0)):
                if r > i + dx >= 0 and c > j + dy >= 0:
                    p = (i + dx) * c + j + dy
                    s ^= (1 << p)
            sha[i * c + j] = s
    for i in range(2 ** (r * c)):
        now = init_state
        for j in range(r * c):
            if i & (1 << j):
                now ^= sha[j]
        if now == target_state:
            return i


def how(r, c):
    a = solve(r, c)
    print(bin(a))


how(3, 3)
