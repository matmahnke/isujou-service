export default class Utils {
    static formatarData(date) {
        const dataNormal = date.toISOString();

        return dataNormal.substring(8, 10) + '/' + dataNormal.substring(5, 7) + '/' + dataNormal.substring(0, 4)
    }
}