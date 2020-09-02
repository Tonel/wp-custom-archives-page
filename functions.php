<?php

// ...

add_action( 'wp_ajax_nopriv_get_archives_data', 'get_archives_data' );
add_action( 'wp_ajax_get_archives_data', 'get_archives_data' );

function get_archives_data() {
    global $wpdb, $wp_locale;

    $search = isset( $_POST["search"] ) ? $_POST["search"] : "";

    $query = "SELECT YEAR(post_date) AS `year`, MONTH(post_date) as `month`, DAYOFMONTH(post_date) as `dayofmonth`, ID, post_name, post_title FROM $wpdb->posts WHERE post_type = 'post' AND post_status = 'publish' AND post_title LIKE '%$search%' ORDER BY post_date DESC";

    $results = $wpdb->get_results($query);

    $ajax_response = [];

    foreach ( $results as $result ) {
        $result->month_name = $wp_locale->get_month($result->month);
        $result->encoded_title = strip_tags(apply_filters('the_title', $result->post_title));
        $ajax_response[] = $result;
    }

    wp_send_json_success($ajax_response);
}