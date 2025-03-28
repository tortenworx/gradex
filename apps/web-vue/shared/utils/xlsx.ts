import { Workbook } from "exceljs";

export async function readGrades(file: Buffer) {
    const wb = new Workbook()
    await wb.xlsx.load(file).then(() => {
    })
    const studentWs = wb.getWorksheet("STUDENTS");
    const worksheet = wb.getWorksheet("GRADES");
    const userdata = [];

    if (!worksheet || !studentWs) return;

    for (let i = 9; i < 31; i++) {
        const student = worksheet.getRow(i);
        const addr = student.getCell(2).value?.formula;
        const [sheet, cell] = addr.split("!", 2);
        const studentId = studentWs.getCell(`B${cell.substring(1)}`).value;
        const studentName = studentWs.getCell(cell).value;
        if (!studentId && !studentName) break;
        const gradeValues = student.values
        if (student.hasValues) {
            const grades = gradeValues.slice(3, 5);
            const data = {
                id: studentId,
                grades,
            };
            userdata.push(data);
        }
    }

    for (let i = 40; i < 70; i++) {
        const student = worksheet.getRow(i);
        const addr = student.getCell(2).value?.formula;
        const [sheet, cell] = addr.split("!", 2);
        const studentId = studentWs.getCell(`B${cell.substring(1)}`).value;
        const studentName = studentWs.getCell(cell).value;
        if (!studentId && !studentName) break;
        const gradeValues = student.values
        if (student.hasValues) {
            const grades = gradeValues.slice(3, 5);
            const data = {
                id: studentId,
                grades,
            };
            userdata.push(data);
        }
    }
    return userdata
}