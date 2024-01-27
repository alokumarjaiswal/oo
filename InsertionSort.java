public class InsertionSort {
    public static void main(String[] args) {
        int[] array = { 5, 1, 6, 2, 4, 3 };
        int temp, j;
        for (int i = 1; i < array.length; i++) {
            temp = array[i];
            j = i - 1;
            while (j >= 0 && array[j] > temp) {
                array[j + 1] = array[j--];
            }
            array[j + 1] = temp;
        }
        System.out.print
    }
}