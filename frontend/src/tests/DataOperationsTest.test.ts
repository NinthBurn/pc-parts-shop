import '@testing-library/jest-dom';
import { ComputerComponent } from '../components/ComputerComponent';
import DeleteElement, { InsertOrUpdateElement } from '../services/DataOperations';

function generateTestData() {
    const data: ComputerComponent[] = [
        {id: 1, manufacturer: "Nvidia", productName: "RTX 4090", category: "Graphics Card", price: 1599.99, releaseDate: new Date("2022/10/30"), quantity: 5},
        {id: 2, manufacturer: "AMD", productName: "Ryzen 5 7600X", category: "Processor", price: 399.99, releaseDate: new Date("2023/6/14"), quantity: 1},
        {id: 3, manufacturer: "AMD", productName: "Ryzen 7 5800X3D", category: "Processor", price: 449.99, releaseDate: new Date("2022/4/22"), quantity: 3},
        {id: 4, manufacturer: "Intel", productName: "Arc A770 16GB", category: "Graphics Card", price: 329.99, releaseDate: new Date("2022/11/12"), quantity: 10000},
        {id: 5, manufacturer: "AMD", productName: "RX 6700XT 12GB", category: "Graphics Card", price: 379.99, releaseDate: new Date("2021/11/18"), quantity: 21},
        {id: 6, manufacturer: "Intel", productName: "Core i7 14700K", category: "Processor", price: 449.99, releaseDate: new Date("2023/8/24"), quantity: 17},
        {id: 7, manufacturer: "AMD", productName: "Ryzen 5 5600X3D", category: "Processor", price: 299.99, releaseDate: new Date("2023/7/7"), quantity: 41},
        {id: 8, manufacturer: "Crucial", productName: "8GB DDR4 3200MHz CL22", category: "RAM", price: 119.99, releaseDate: new Date("2020/4/15"), quantity: 35},
        {id: 10, manufacturer: "G.Skill", productName: "White Trident Z5 RGB Series DDR5-8200 24GBx2", category: "RAM", price: 459.99, releaseDate: new Date("2023/6/28"), quantity: 14},
        {id: 11, manufacturer: "Nvidia", productName: "RTX 3060 12GB", category: "Graphics Card", price: 329.99, releaseDate: new Date("2020/02/25"), quantity: 318},
        {id: 12, manufacturer: "Nvidia", productName: "RTX 4070 Ti Super 16GB", category: "Graphics Card", price: 799.99, releaseDate: new Date("2024/01/24"), quantity: 55},
        {id: 13, manufacturer: "Gigabyte", productName: "B650M GAMING PLUS WIFI", category: "Motherboard", price: 199.99, releaseDate: new Date("2023/07/03"), quantity: 7},
        {id: 14, manufacturer: "ASRock", productName: "Z790 Taichi Intel Z790 LGA 1700 Extended ATX", category: "Motherboard", price: 229.99, releaseDate: new Date("2023/06/15"), quantity: 11},
        {id: 15, manufacturer: "Some company", productName: "with a really long product name, because that would be funny, would it not?", category: "Din bube, mucegaiuri şi noroi Iscat-am frumuseţi şi preţuri noi. Biciul răbdat se-ntoarce în cuvinte Si izbăveşte-ncet pedepsitor", price: 9999.99, releaseDate: new Date("2077/12/10"), quantity: 999999},
        {id: 16, manufacturer: "MSI", productName: "B650M GAMING PLUS WIFI", category: "Motherboard", price: 219.99, releaseDate: new Date("2023/07/03"), quantity: 12},
        {id: 17, manufacturer: "G.Skill", productName: "White Trident Z5 RGB Series DDR5-8200 24GB", category: "RAM", price: 229.99, releaseDate: new Date("2023/6/28"), quantity: 2},
      ];
    return data;
  }

test('Test loading the data', () => {
    const data = generateTestData();
    const originalLength = data.length;
    const entry5: ComputerComponent = {id: 5, manufacturer: "AMD", productName: "RX 6700XT 12GB", category: "Graphics Card", price: 379.99, releaseDate: new Date("2021/11/18"), quantity: 21};

    expect(originalLength).toBe(16);
    expect(data[4]).toStrictEqual(entry5);
});

test('Inserting a new entry in the array', () => {
    const data = generateTestData();
    const newEntry: ComputerComponent = {id: 25, manufacturer: "AMD", productName: "RX 5700XT 8GB", category: "Graphics Card", price: 379.99, releaseDate: new Date("2019/11/18"), quantity: 11};

    expect(data.length).toBe(16);
    const {newData, status} = InsertOrUpdateElement(data, newEntry);
    expect(newData.length).toBe(17);
    expect(status).toStrictEqual("added");
    expect(newData[16]).toStrictEqual(newEntry);
});

test('Updating an existing element from the array', () => {
    const data = generateTestData();
    const originalLength = data.length;
    const originalEntry5: ComputerComponent = {id: 5, manufacturer: "AMD", productName: "RX 6700XT 12GB", category: "Graphics Card", price: 379.99, releaseDate: new Date("2021/11/18"), quantity: 21};
    const updatedEntry5: ComputerComponent = {id: 5, manufacturer: "AMD", productName: "RX 6700XT 12GB", category: "Graphics Card", price: 329.49, releaseDate: new Date("2021/11/18"), quantity: 9};

    expect(data[4]).toStrictEqual(originalEntry5);

    const {newData, status} = InsertOrUpdateElement(data, updatedEntry5);
    expect(status).toStrictEqual("updated");
    expect(newData[4]).toStrictEqual(updatedEntry5);
    expect(newData[4]).not.toStrictEqual(originalEntry5);
    expect(newData.length).toBe(originalLength);
});

test('Deleting an existing element from the array', () => {
    const data = generateTestData();
    const originalLength = data.length;
    const originalEntry5: ComputerComponent = {id: 5, manufacturer: "AMD", productName: "RX 6700XT 12GB", category: "Graphics Card", price: 379.99, releaseDate: new Date("2021/11/18"), quantity: 21};

    expect(data[4]).toStrictEqual(originalEntry5);

    const newData = DeleteElement(data, 5);

    expect(newData[4]).not.toStrictEqual(data[4]);
    expect(newData.length).not.toBe(originalLength);
    expect(newData.length).toBe(originalLength - 1); 
});

test('Deleting an element that does not exist in the array', () => {
    const data = generateTestData();
    const originalLength = data.length;

    const newData = DeleteElement(data, 25);

    expect(newData.length).toBe(originalLength);
    expect(newData).toStrictEqual(data); 
});