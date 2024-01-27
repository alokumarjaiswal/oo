import re  # module  for support of Regular Expression

# import datetime  # module for support of date and time

"""       Regular Expression       """
""" A RegEx, or Regular Expression, is a sequence of characters that defines a search pattern. """
""" Quantifiers: Quantifiers simply specify the quantity of the characters to match. """
r""" [0-9] is equivalent to \d and [^0-9] is equivalent to \D """
""" ^ and $ are used to check if a string starts with or ends with a particular character or pattern, respectively. """
r""" ^ is equivalent to \A and $ is equivalent to \Z """
r""" \b matches the empty string, but only at the beginning or end of a word. """
""" This means that r'\bfoo\b' matches 'foo', 'foo.', '(foo)', 'bar foo baz' but not 'foobar' or 'foo3'. """
r""" \w is used to check if a string contains any word character[a-z, A-Z, 0-9, _]. """
""" .split() method returns a list of strings split at each match of the pattern done from left to right. """
""" .search() method returns a match object if there is a match anywhere in the string. """
""" Match object is a special data type that stores the information of the search result. """
""" := is called walrus operator, it assigns values to variables as part of a larger expression. """

# 1
""" pattern = re.compile(r"")  #pattern is a variable, this line can be skipped. Uncomment it if you want to use it. """
my_string = input('enter a string: ')
pattern = re.compile(r"[0-9]")  # [0-9] means any digit from 0 to 9, it is a pattern definition
result = pattern.sub("_", my_string)  # sub is for substitution, "_" is for replacement of the pattern defined above
print(result)

# 2
#  pattern = re.compile(r"")
my_string = input('enter a string: ')
pattern = re.compile(r"[0-9]+")  # + means one or more characters, it is a quantifier
result = pattern.sub("_", my_string)
print(result)

# 3
#  pattern = re.compile(r"")
my_string = input('enter a string: ')
pattern = re.compile(r"\d+")  # \d means any digit character, it is a pattern definition
result = pattern.sub("_", my_string)
print(result)

# 4
#  pattern = re.compile(r"")
my_string = input('enter a string: ')
pattern = re.compile(r"\d+")
result = pattern.sub("$", my_string)
print(result)

# 5
#  pattern = re.compile(r"")
my_string = input('enter a string: ')
pattern = re.compile(r"\D")  # \D means any non-digit character
result = pattern.sub("_", my_string)
print(result)

# 6
#  pattern = re.compile(r"")
my_string = input('enter a string: ')
pattern = re.compile(r"\D+")
result = pattern.sub("_", my_string)
print(result)

# 7
#  pattern = re.compile(r"")
my_string = input('enter a string: ')
pattern = re.compile(r"[^0-9]+")  # ^ means any character except the ones defined in the pattern
result = pattern.sub("_", my_string)
print(result)

# 8
my_string = input('enter a string: ')
result = re.findall(r"\d", my_string)  # findall is for finding all the patterns defined in the string
print(result)

# 9
my_string = input('enter a string: ')
result = re.findall(r"\d+", my_string)
print(result)

# 10 Write a program to verify the first letter of input string is correct as it was entered.
my_str = "Bond! James Bond"
pattern = re.findall(r"^Bond", my_str)
if pattern:
    print('yes, the string starts with Bond!')
else:
    print('no match')

# 11
pattern = re.findall(r"^James", my_str)
if pattern:
    print('yes, the string starts with Bond!')
else:
    print('no match')

# 12
pattern = re.findall(r"^Blond", my_str)
if pattern:
    print('yes, the string starts with Bond!')
else:
    print('no match')
# 13
pattern = re.findall(r"^B", my_str)
if pattern:
    print('yes, the string starts with B!')
else:
    print('no match')

# 14 Write a program to verify the last letter of input string is correct as it was entered.
my_str = "Bond! James Bond 007"
pattern = re.findall(r"007$", my_str)
if pattern:
    print('yes, the string ends with 007!')
else:
    print('no match')

# 15
pattern = re.findall(r"807$", my_str)
if pattern:
    print('yes, the string ends with 007!')
else:
    print('no match')

# 16 write a program to verify the first letter of input string is correct as it was entered, without using ^ operator.
my_str = "Patience is the key to success"
result = re.findall(r"\APatience", my_str)  # \A means the beginning of the string
print(result)
if result:
    print('yes, there is a match!')
else:
    print('no match')

# 17 write a program to search any given word of input string and also verify its position.
my_str = "The truth is...I am The Iron Man"
result = re.search(r"Iron", my_str)  # search is for searching a pattern in a string
print(result)
if result:
    print('yes, there is a match!')
else:
    print('no match')

# 18
result = re.search(r"The", my_str)
print(result)
if result:
    print('yes, there is a match!')
else:
    print('no match')

# 19
result = re.findall(r"The", my_str)
print(result)
if result:
    print('yes, there is a match!')
else:
    print('no match')

# 20
my_str = "We are Venom"
result = re.split(r"\s", my_str)  # split is for splitting a string into a list of strings, \s means any whitespace
print(result)

# 21 special case of split() method where you can specify the maximum number of splits as an optional parameter.
my_str = "The name is Cable"
result = re.split(r"\s", my_str, 2)  # 2 means the maximum number of splits
print(result)

# 22
result = re.split(r"\s", my_str, 1)  # 1 means the maximum number of splits
print(result)

# 23 write a program to search for an upper case character in the beginning of a word, and print its position.
my_str = "I am Iron Man"
# \bM\w+ means any word starting with M followed by any word character one or more times.
result = re.search(r"\bM\w+", my_str)
print(result.span())  # .span() is for printing the position of the match

# 24 write a program to search for an upper case character in the beginning of a word, and print the complete word.
result = re.search(r"\bM\w+", my_str)
print(result.group())  # .group() is for printing the match

# 25 write a program to search for the character in the beginning of a word, and print the complete word.
my_input = "Avengers"
data_sequence = re.search(r"\b[a-zA-Z]vengers", my_input)  # [a-zA-Z] means any character from a to z or A to Z
print(data_sequence)

# 26
text = "Python 3.8 was released on 14-10-2019"
if match_res := re.search(r"\d{2}-\d{2}-\d{4}", text):  # {n} means exactly n occurrences of the pattern, quantifier
    print('the matched result is: ', match_res.group())
