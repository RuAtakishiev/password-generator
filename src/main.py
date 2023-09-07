from random import randrange, sample
from typing import Literal
from enum import Enum

from exceptions import CantGetIntType, CantGetStrType

char = list()


class AlphabetPower(str, Enum):
    DIGITS = '0123456789'
    UPPERCASE_LETTERS = 'QWERTYUIOPASDFGHJKLZXCVBNM'
    LOWERCASE_LETTERS = 'qwertyuiopasdfghjklzxcvbnm'
    SPECIAL_SYMBOLS = '!#$%&*+-=?@^_'


def get_passwords_info(
        question: str,
        question_type: Literal["quantity"] | Literal["length"]
) -> int:
    try:
        int_question_value = int(input(question))

        if question_type == "quantity" and int_question_value < 0:
            print("Incorrect input data. Enter positive numbers!")
            return get_passwords_info(question, "quantity")

        else:
            return int_question_value

    except ValueError:
        # raise CantGetIntType
        print("Incorrect input data type. Enter integers!")
        return get_passwords_info(question, question_type)


def get_alphabet_composition(
        question: str,
        alphabet_type: AlphabetPower
):
    try:
        question_value = input(question).strip().lower()

        if question_value in ('y', 'ye', 'yes'):
            char.append(alphabet_type)

        elif question_value in ('n', 'no'):
            pass

        else:
            print("""Incorrect input data type. Enter 'y' or 'n'!""")
            return get_alphabet_composition(question, alphabet_type)

    except ValueError:
        # raise CantGetBoolType
        print("Incorrect input data type. Enter 'y' or 'n'!")
        return get_alphabet_composition(question, alphabet_type)


def dictionary_of_valid_characters(pwd_length: int, char: list) -> str:
    pwd_alphabet = list()
    count = 0
    flag = True

    for _ in range(pwd_length):
        pwd_alphabet.append(char[count][randrange(0, len(char[count]))])

        if count < len(char) - 1 and flag:
            count += 1

        elif not flag:
            count = randrange(0, len(char))

        else:
            flag = False
            count = randrange(0, len(char))

    return ''.join(sample(pwd_alphabet, len(pwd_alphabet)))


pwd_quantity = get_passwords_info("Number of passwords:\n", "quantity")
pwd_length = get_passwords_info("Password length:\n", "length")

get_alphabet_composition("Include DIGITS? Enter 'y' or 'n': ", AlphabetPower.DIGITS)
get_alphabet_composition("Include UPPERCASE LETTERS? Enter 'y' or 'n': ", AlphabetPower.UPPERCASE_LETTERS)
get_alphabet_composition("Include LOWERCASE LETTERS? Enter 'y' or 'n': ", AlphabetPower.LOWERCASE_LETTERS)
get_alphabet_composition("Include SPECIAL SYMBOLS? Enter 'y' or 'n': ", AlphabetPower.SPECIAL_SYMBOLS)


if len(char) != 0:
    while pwd_length < len(char):
        print(f"""Invalid password length. The minimum password length is {len(char)}""")
        pwd_length = get_passwords_info("Password length:\n", "length")

    for _ in range(pwd_quantity):
        print(dictionary_of_valid_characters(pwd_length, char))

else:
    print("There's nothing I can do!")
