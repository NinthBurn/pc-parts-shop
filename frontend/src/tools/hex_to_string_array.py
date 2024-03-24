result = "["

with open("hex_values.txt", "r+") as hex_file:
    hex_values = hex_file.readlines()

for hex in hex_values:
    result += "\"" + hex[:-1] + "\", "

result = result[:-2] + "]"

with open("hex_values_output.txt", "w+") as hex_file:
    hex_file.write(result)