import math
"""     Exception Handling     """
""" python uses try-except block to handle exceptions, else and finally are optional. """
"""" classes of built-in exceptions: https://docs.python.org/3/library/exceptions.html#exception-hierarchy """
""" we cannot handle multiple exceptions simultaneously, only the first matching except block will be executed. """
""" if the try or except statement reaches a break, continue or return statement, ---"""
"""---the finally clause will execute just prior to the break, continue or return statement's execution. """
""" continue statement in finally block works in version 3.8.0 and later. """
""" .format() method is used to format the output in the print() function. """

# 1
a = 5
b = 0

# print(a/b)  # ZeroDivisionError: division by zero, uncomment this line to see the error
print('well done!')  # this line will not be executed if the above line is uncommented

# 2
try:  # try block contains the code that may cause an exception
    print(a / b)
except:  # except block contains the code that handles the exception
    print('You cannot divide a number by zero!')
print('well done!')  # this line will be executed

# 3
b = 2
try:
    print(a / b)
except:
    print('You cannot divide a number by zero!')
print('well done!')

# 4
b = 0
try:
    print(a / b)
except Exception as e:
    print('the error is:', e)
print('well done!')

# 5
try:
    x = int(input('Enter a number: '))
    print(x)
except Exception as e:
    print('the error is:', e)
print('well done!')

# 6
try:
    x = int(input('Enter a number: '))
    print(x)
    print(a / b)
except Exception as e:
    print('the error is:', e)

# 7 we can handle different exceptions separately
try:
    x = int(input('Enter a number: '))
    print(x)
    print(a / b)
except ZeroDivisionError as e:
    print('the error is:', e)
except ValueError as e:
    print('the input is not valid!')
except Exception as e:
    print('the error is:', e)

# 8
try:
    x = int(input('Enter a number: '))
    print(x)
    print(a / b)
except ZeroDivisionError as e:
    print('the error is:', e)
except ValueError as e:
    print('the input is not valid!')
except Exception as e:
    print('the error is:', e)
finally:  # finally block contains the code that is executed regardless of the exception
    print('exception handled!')

# 9 this loop will continue until the user enters a valid input
while True:
    try:
        x = int(input('Enter a number: '))
        print(x)
        break
    except ValueError:
        print('the input is not valid!')
    finally:
        print('exception handled!')

# 10
x = 0
while x < 5:
    try:
        if x != 3:
            print('x = {0}'.format(x))
    except:  # this block will not be executed
        continue  # continue statement causes the loop to skip the rest of its body and immediately retest its condition
    finally:
        x += 1

# 11


def func():
    for num in range(5):
        try:
            print(num)
        except Exception as E:
            print(E)
        finally:  # will not work in version 3.7.0 and earlier
            continue


func()

# 12
try:
    math.sqrt(-1)
except ValueError as e:
    e.add_note('negative argument passed to sqrt')  # will work in version 3.11.0 and later
    raise
