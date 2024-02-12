public class BubbleSort {

    public static void main(String[] args) {
        int[] array = { 5, 2, 6, 1, 3, 7, 4, 9, 8 };
        for (int i = 0; i < array.length - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < array.length - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}