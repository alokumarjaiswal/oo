"""     Generators     """
""" A generator is a function that returns an object (iterator) which we can iterate over (one value at a time). """
""" Generators are used to create iterators, but with a different approach. """
""" yield() function is used to return the iterator object. """
""" generator comprehension is used to create generators. """
""" generators are memory efficient as they do not store the values in memory. """



# 1
def sq_num(my_list):
    for i in my_list:
        yield i*i


a = sq_num([4, 3, 2, 1])
print(a)

# 2
print(next(a))  # next() function is used to iterate over the generator object
print(next(a))
print(next(a))
print(next(a))

# 3
# print(next(a))  # StopIteration error is raised when the generator is exhausted

# 4 using for loop to iterate over the generator object
a = sq_num([4, 3, 2, 1])
for x in a:  # for loop automatically handles the StopIteration error
    print(x, end=' ')

# 5
a = [4, 3, 2, 1]
gen_comp = (i*i for i in a)  # generator comprehension
for x in gen_comp:
    print(x, end=' ')

# 6
gen_comp = (i*i for i in a)
print(list(gen_comp))  # generator object can be converted to list

# 7
def fib_series(n):
    a, b = 0, 1
    while True:
        c = a + b
        if c < n:
            yield c
            a, b = b, c
        else:
            break


gen_fib = fib_series(10)
print(gen_fib)
print(next(gen_fib))
print(next(gen_fib))

print(list(fib_series(10)))

