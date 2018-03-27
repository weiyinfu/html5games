import queue


def show(n, r, c):
    s = bin(n)[2:]
    s = '0' * (r * c - len(s)) + s
    print('\n'.join(s[j:j + c] for j in range(0, r * c, c)))
    print('=' * 10)
    input()


def solve(r, c):
    q = queue.Queue()
    init_state = int('0' * (r * c))
    target_state = int('1' * (r * c), 2)
    q.put(init_state)
    vis = dict()
    vis[init_state] = init_state
    found = False
    sha = [0] * (r * c)
    for i in range(r):
        for j in range(c):
            s = 0
            for dx, dy in ((0, 0), (0, 1), (0, -1), (1, 0), (-1, 0)):
                if r > i + dx >= 0 and c > j + dy >= 0:
                    p = (i + dx) * c + j + dy
                    s ^= (1 << p)
            sha[i * c + j] = s

    while not q.empty() and not found:
        now = q.get()
        for i in sha:
            nex = now ^ i
            if nex not in vis:
                vis[nex] = now
                q.put(nex)
                if nex == target_state:
                    found = True

    if not found:
        print("无解")
        return None
    else:
        a = [target_state]
        now = target_state
        while now != init_state:
            now = vis[now]
            a.append(now)
        return a[::-1]


def how(r, c):
    a = solve(r, c)
    for i in a:
        show(i, r, c)


how(3, 3)
