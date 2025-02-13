import { Workbook } from "exceljs";
import { ReadStream } from "node:fs";
import { PassThrough, Readable, Stream, Writable } from 'node:stream'

export interface ExportOptions {
    classId: string;
    recordId: string;
}

export interface GradeData {
    name: string;
    id: string;
    grades: [number, number],
    gender: any
}

export async function exportSpreadsheet(options: ExportOptions, data: GradeData[]) {
    const wb = new Workbook();
    await wb.xlsx.readFile('src/utils/xlsx/shs.xlsx')
    if (!data || data.length == 0) {
        throw new Error('Bat may kulang? Tell me, when did I go wrong???')
    }
    wb.creator = "Jarelle Emmanuel Payad Andulan, GradeX Team";
    wb.keywords = "ezImport, GradeX";
    const studentsWorksheet = wb.getWorksheet("STUDENTS");
    const gradesWorksheet = wb.getWorksheet("GRADES");

    const classId = studentsWorksheet.getCell("D3");
    const recordId = studentsWorksheet.getCell("D4");
    const date = studentsWorksheet.getCell("J3");
    let rowCount = 9;

    classId.value = options.classId;
    recordId.value = options.recordId;
    date.value = new Date().toISOString();
    console.log(data.filter((m) => m.gender == "MALE"))
    data.filter((m) => m.gender == "MALE").forEach((item) => {
        studentsWorksheet.getRow(rowCount).getCell("B").value = item.id;
        studentsWorksheet.getRow(rowCount).getCell("C").value = item.name;
        if (item.grades) {
            for (let i = 0; i < item.grades.length; i++) {
            const cell = gradesWorksheet.getRow(rowCount).getCell(i + 3)
            cell.value = item.grades[i];
            }
        }
        rowCount++;
    })
        rowCount = 40;
        data.filter((m) => m.gender !== "MALE").forEach((item) => {
            studentsWorksheet.getRow(rowCount).getCell("B").value = item.id;
            studentsWorksheet.getRow(rowCount).getCell("C").value = item.name;
            if (item.grades) {
                for (let i = 0; i < item.grades.length; i++) {
                const cell = gradesWorksheet.getRow(rowCount).getCell(i + 3)
                cell.value = item.grades[i];
                }
            }
            rowCount++;
        })
    const stream = new PassThrough()
    await wb.xlsx.write(stream)
    return wb.xlsx.writeBuffer()
}