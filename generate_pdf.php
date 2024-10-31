<?php
require __DIR__ . '/vendor/autoload.php';

use Spipu\Html2Pdf\Html2Pdf;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $quoteData = json_decode($_POST['quoteData'], true);

    $htmlContent = '
    <style>
        body { font-family: Arial, sans-serif; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
        th { background-color: #25d366; color: white; }
        .total { text-align: right; padding: 10px; font-size: 1.2rem; }
    </style>
    <h1>Cotización de Servicios</h1>
    <table>
        <thead>
            <tr>
                <th>Servicio</th>
                <th>Descripción</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody>';

    $total = 0;
    foreach ($quoteData as $item) {
        $service = htmlspecialchars($item['service']);
        $description = isset($item['description']) ? htmlspecialchars($item['description']) : 'Sin descripción';
        $price = isset($item['price']) ? number_format($item['price'], 0, '', '.') : '0';

        $htmlContent .= '
        <tr>
            <td>' . $service . '</td>
            <td>' . $description . '</td>
            <td>$' . $price . '</td>
        </tr>';
        $total += $item['price'];
    }

    $htmlContent .= '
        </tbody>
    </table>
    <div class="total">Total: $' . number_format($total, 0, '', '.') . '</div>';

    try {
        $html2pdf = new Html2Pdf();
        $html2pdf->writeHTML($htmlContent);
        $html2pdf->output('cotizacion.pdf');
    } catch (Exception $e) {
        echo 'Error al generar el PDF: ',  $e->getMessage();
    }
}
