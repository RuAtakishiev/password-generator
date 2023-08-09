from random import randint
from random import sample

DIGITS = '0123456789'
UPPERCASE_LETTERS = 'QWERTYUIOPASDFGHJKLZXCVBNM'
LOWERCASE_LETTERS = 'qwertyuiopasdfghjklzxcvbnm'
PUNCTUATION = '!#$%&*+-=?@^_'
char = list()


def isdigit_valid(question):
    str_digit = input(question)

    if str_digit.isdigit():
        return int(str_digit)
    else:
        return isdigit_valid(question)


def alphabet_composition(answer, symbols):
    if answer.lower() in ('д', 'да', 'y', 'yes'):
        char.append(symbols)


def dictionary_of_valid_characters(psw_length, char):
    psw_alphabet = list()
    count = 0
    flag = True

    for i in range(psw_length):
        psw_alphabet.append(char[count][randint(0, len(char[count]) - 1)])

        if count < len(char) - 1 and flag:
            count += 1
        else:
            flag = False
            count = randint(0, len(char) - 1)

    return print(''.join(sample(psw_alphabet, len(psw_alphabet))))


psw_quantity = isdigit_valid('Кол-во паролей\n')
psw_length = isdigit_valid('Длина пароля\n')

isdigit_include = input('Включать цифры? Введите \'да\' или \'нет\'\n').strip()
uppercase_include = input('Включать прописные буквы? Введите \'да\' или \'нет\'\n').strip()
lowercase_include = input('Включать строчные буквы? Введите \'да\' или \'нет\'\n').strip()
special_symbols_include = input('Включать специальные символы? Введите \'да\' или \'нет\'\n').strip()

alphabet_composition(isdigit_include, DIGITS)
alphabet_composition(uppercase_include, UPPERCASE_LETTERS)
alphabet_composition(lowercase_include, LOWERCASE_LETTERS)
alphabet_composition(special_symbols_include, PUNCTUATION)

if len(char) != 0:
    while psw_length < len(char):
        print(f"""Недопустимая длина пароля. Минимальная длина пароля равна {len(char)}""")
        psw_length = isdigit_valid('Длина пароля\n')

    for _ in range(psw_quantity):
        dictionary_of_valid_characters(psw_length, char)

else:
    print('Ничем не могу помочь!')
