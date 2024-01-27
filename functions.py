"""     Functions     """
""" in python,functions and methods are not the same thing. """
""" A method is a function that belongs to a class. it is invoked on an object with dot notation.  """
""" all methods are functions, but not all functions are methods. """
""" a method alters the state of an object, but a function does not. """
""" parameter is a variable in the declaration of a function or method. """
""" argument is the actual value of this variable that gets passed to function. """
""" pass by value: the function receives a copy of the argument passed. """
""" pass by reference: the function receives a reference to the argument passed. """
""" python uses pass by value for immutable objects and pass by reference for mutable objects. """
""" immutable objects: int, float, bool, string, tuple """
""" mutable objects: list, dict, set """

# 1
a = [4, 3, 2, 1]
a.sort()  # sort() is a method, it alters the state of the object as 'a' is sorted
print(a)
b = sorted(a)  # sorted() is a function, it does not alter the state of the object as 'a' is not sorted
print(b)
# print(a)  # a is not sorted if the sort() method is not executed

# 2 which method does python use to pass arguments to functions?
a = 10


def change(a):
    a = 20
    print('inside function, ', a, 'has address: ', id(a))
    return


print('outside function, ', a, 'has address: ', id(a))
change(a)
print('function after call, ', a, 'has address: ', id(a))
print(change(10))

# 3
a = [1, 2, 3, 4]


def change(a):
    a[1] = 20
    print('inside function, ', a, 'has address: ', id(a))
    return


print('outside function, ', a, 'has address: ', id(a))
change(a)
print('function after call, ', a, 'has address: ', id(a))
print(change(a))

# 4
