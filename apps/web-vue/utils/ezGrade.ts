import Excel from "exceljs";
import { PassThrough } from 'node:stream'
import type { GradeRecord } from "~/types/GradeReport";
import { Gender } from "~/types/User";

export interface ExportOptions {
    classId: string;
    recordId: string;
}

export interface GradeData {
    name: string;
    id: string;
    grades: [number, number] | number
    gender: any
}

export async function exportSpreadsheet(options: ExportOptions, data: GradeRecord[]) {
    const wb = new Excel.Workbook();
    await wb.xlsx.readFile('utils/xlsx/shs.xlsx')
    if (!data || data.length == 0) {
        throw new Error('No data was passed to the spreadsheet function.')
    }
    wb.creator = "Jarelle Emmanuel Payad Andulan, GradeX Team";
    wb.keywords = "ezImport, GradeX";
    const studentsWorksheet = wb.getWorksheet("STUDENTS");
    const gradesWorksheet = wb.getWorksheet("GRADES");

    if (!studentsWorksheet || !gradesWorksheet) throw new Error('Failed to load worksheets. Did you delete one of them?')

    const classId = studentsWorksheet.getCell("D3");
    const recordId = studentsWorksheet.getCell("D4");
    const date = studentsWorksheet.getCell("J3");
    let rowCount = 9;

    classId.value = options.classId;
    recordId.value = options.recordId;
    date.value = new Date().toISOString();
    data.filter((m) => m.user.gender == Gender.MALE).forEach((item) => {
        const completedName = `${item.user.last_name}, ${item.user.first_name} ${item.user.middle_name}`
        studentsWorksheet.getRow(rowCount).getCell("B").value = item.user._id;
        studentsWorksheet.getRow(rowCount).getCell("C").value = completedName;
        const cell = gradesWorksheet.getRow(rowCount).getCell(3)
        if (item.avg && Array.isArray(item.avg)) {
            for (let i = 0; i < item.avg.length; i++) {
            const cell = gradesWorksheet.getRow(rowCount).getCell(i + 3)
            cell.value = item.avg[i];
            }
        }
        rowCount++;
    })
        rowCount = 40;
        data.filter((m) => m.user.gender == Gender.FEMALE || m.user.gender == Gender.OTHER).forEach((item) => {
            const completedName = `${item.user.last_name}, ${item.user.first_name} ${item.user.middle_name}`
            studentsWorksheet.getRow(rowCount).getCell("B").value = item.user._id;
            studentsWorksheet.getRow(rowCount).getCell("C").value = completedName;
            const cell = gradesWorksheet.getRow(rowCount).getCell(3)
            if (item.avg && Array.isArray(item.avg)) {
                for (let i = 0; i < item.avg.length; i++) {
                const cell = gradesWorksheet.getRow(rowCount).getCell(i + 3)
                cell.value = item.avg[i];
                }
            }
            rowCount++;
        })
    const stream = new PassThrough()
    await wb.xlsx.write(stream)
    return wb.xlsx.writeBuffer()
}