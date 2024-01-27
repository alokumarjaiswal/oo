"""     Iterables and Iterators     """
""" iterators are objects that can be iterated upon. """
""" iterables are objects that can return an iterator. """
""" All the collection objects like lists, tuples, strings, dictionaries, sets are iterables. """
""" The iter() function (which in turn calls the __iter__() method) returns an iterator from them. """
""" The next() function (which in turn calls the __next__() method) returns the next item from the iterator. """
""" The for loop automatically creates an iterator object and executes the next() method for each loop. """
""" The __iter__() method returns the iterator object itself. """
""" The __next__() method should raise a StopIteration exception when there are no more items to return. """
""" The __iter__() method can be called on an iterable object to get an iterator. """
""" The for loop can be used to iterate over an iterable or an iterator object. """
""" magic methods are special methods which have double underscores at the beginning and end of their names. """

# 1 to print the square of each number in a list


def sq_num(my_list):
    result = []
    for i in my_list:
        result.append(i**2)
    return result


a = [4, 3, 2, 1]
print(sq_num(a))

# 2 magic method __iter__
print(dir(a))  # to see the methods that can be used on a list
print(a.__iter__())  # to see the iterator of a list
print(iter(a))  # to see the iterator of a list

# 3 magic method __next__
# print(a.__next__())  # to see the next element of the list
# print(next(a))  # to see the next element of the list

# 4
b = iter(a)
print(dir(b))
print(b)
print(next(b))
print(next(b))
print(next(b))
print(next(b))

# 5
# print(next(b))  # StopIteration error

# 6
b = iter(a)
for i in b:
    print(i, end=' ')