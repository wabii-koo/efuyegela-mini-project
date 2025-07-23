<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$data = [
    [
        "title" => "Getting Started with HTML",
        "passage" => "HTML is the standard markup language used to create web pages. It forms the basic structure of all websites."
    ],
    [
        "title" => "Mastering CSS for Beginners",
        "passage" => "CSS is used to style and layout web pages. This guide helps beginners understand how to apply colors, fonts, and layouts effectively."
    ],
    [
        "title" => "Understanding JavaScript Basics",
        "passage" => "JavaScript allows you to add interactivity to your website. Learn how to write basic scripts and make your pages dynamic."
    ]
];

echo json_encode($data);
?>
