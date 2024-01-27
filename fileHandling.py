import os
"""     File Handling     """
""" File Handling simply means  to read from or write to a file. """
""" open() function is used to open a file in different modes like read, write, append etc.  """
""" open(name, mode) """
""" 'x' is used to create a new file, if it already exists then it will give an error. """
""" 'w' can be used to create a new file, if it already exists then it will overwrite it. """
""" the file should be in the same directory as the python file. """
""" closing a file after opening it is a good practice because it frees up the resources. """
""" with function is used to open a file and close it automatically. """
""" .seek() function is used to move the cursor to a specific position in the file. """
""" line is a sequence of characters terminated by a new line character. """
""" while reading a file, empty string is returned when the end of file is reached[12(b)]. """

print(os.getcwd())  # to print the current working directory

# 1 (a)creating a text file with the command function "x"
# file = open('new_file.txt', 'x')  # x is used to create a new file
# 1 (b)creating a text file with the command function "w"
file = open("new_file.txt", "w")  # w is used to write to a file
print(file.name)  # to print the name of the file
print(file.mode)  # to print the mode of the file
file.close()  # to close the file

# 2
with open('new_file.txt', 'r') as file:  # r is used to read a file
    pass  # pass is used to do nothing
print(file.closed)  # to check if the file is closed or not

# 3
with open('new_file.txt', 'w') as file:
    file.write('Hello world!\nHow are you?\n')  # to write to a file
with open('new_file.txt', 'r') as file:
    print(file.read())  # to read the whole file

# 4
stuff = ['hello ', 'world!\n', 'how ', 'are ', 'you?\n']
with open('new_file.txt', 'w') as file:
    file.writelines(stuff)  # to write a list to a file
with open('new_file.txt', 'r') as file:
    print(file.read())

# 5
with open('new_file.txt', 'w') as file:
    file.write('Hello world!\nHow are you?\n')
    file.seek(52)
    file.writelines(stuff)
with open('new_file.txt', 'r') as file:
    print(file.read())

# 6
with open('new_file.txt', 'a') as file:  # a is used to append to a file
    file.write('I am fine.\n')
with open('new_file.txt', 'r') as file:
    print(file.read())

# 7
with open('new_file.txt', 'r') as file:
    print(file.readline())  # to read a single line

# 8
with open('new_file.txt', 'r') as file:
    print(file.readline(), end='')  # end='' is used to remove the extra line
    print(file.readline(), end='')
    print(file.readline(), end='')

# 9
with open('new_file.txt', 'r') as file:
    print(file.readlines())  # to read all the lines and store them in a list

# 10
with open('new_file.txt', 'r') as file:
    for line in file:  # to read a file line by line, it is more efficient than readline()
        print(line, end='')

# 11
with open('new_file.txt', 'r') as file:
    print(file.read(5), end='')  # to read the first 5 characters of a file
    print(file.read(5), end='')  # to read the next 5 characters of a file
    print(file.read(10), end='')  # to read the next 10 characters of a file

# 12 (a) to read a file in chunks of defined size
with open('new_file.txt', 'r') as file:
    size_to_read = 10
    file_content = file.read(size_to_read)
    while len(file_content) > 0:
        print(file_content, end='')
        file_content = file.read(size_to_read)  # to read the next 10 characters of a file
# 12 (b) to read a file in chunks of defined size, refer doc string for more info
with open('new_file.txt', 'r') as file:
    size_to_read = 10
    file_content = file.read(size_to_read)
    while len(file_content) > 0:
        print(file_content, end='*')
        file_content = file.read(size_to_read)

# 13
with open('new_file.txt', 'r') as file:
    size_to_read = 10
    file_content: str = file.read(size_to_read)
    print(file.tell())  # to print the current position of the cursor

# 14
with open('new_file.txt', 'r') as file:
    size_to_read = 10
    file_content = file.read(size_to_read)
    print(file_content, end='')
    file_content = file.read(size_to_read)
    print(file_content, end='')

# 15
with open('new_file.txt', 'r') as file:
    size_to_read = 10
    file_content = file.read(size_to_read)
    print(file_content, end='')

    file.seek(0)  # to move the cursor to the beginning of the file

    file_content = file.read(size_to_read)
    print(file_content)

# 16
with open('new_file.txt', 'w') as file:
    file.write('Python')
    file.seek(0)
    file.write('C')
with open('new_file.txt', 'r') as file:
    print(file.read())

# 17 to copy the contents of a file to another file
with open('new_file.txt', 'r') as file:
    with open('new_file(1).txt', 'w') as f:
        for line in file:
            f.write(line)

# 18 to copy the contents of a file to another file in chunks
with open('new_file.txt', 'r') as file:
    with open('new_file(1).txt', 'w') as f:
        size_to_read = 10
        file_content = file.read(size_to_read)
        while len(file_content) > 0:
            f.write(file_content)
            file_content = file.read(size_to_read)

# 19 to copy the contents of an image file to another image file
with open('image.jpg', 'rb') as file:
    with open('image(1).jpg', 'wb') as f:
        for line in file:
            f.write(line)

# 20 to copy the contents of an image file to another image file in chunks
with open('image.jpg', 'rb') as file:
    with open('image(1).jpg', 'wb') as f:
        size_to_read = 1
        file_content = file.read(size_to_read)
        while len(file_content) > 0:
            f.write(file_content)
            file_content = file.read(size_to_read)

# 21
os.rename('new_file(1).txt', 'delete.txt')  # to rename a file
os.rename('image(1).jpg', 'delete.jpg')

# 22
os.remove('delete.txt')  # to delete a file
os.remove('delete.jpg')

# 23
os.mkdir('D:\\new_folder')  # to create a new folder
os.chdir('D:\\new_folder')  # to change the current working directory
print(os.getcwd())
# os.remove('D:\\new_folder')  # uncomment this line to delete the folder
os.chdir('D:\\Documents\\myPeePee')  # to change the current working directory
print(os.getcwd())
