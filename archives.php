<?php
/*
 * Template Name: Archives
 */
?>

<?php
add_action('wp_enqueue_scripts', 'add_archives_dependencies');

function add_archives_dependencies() {
    $js_path = get_template_directory_uri() . '/assets/js/archives.js';
    $css_path = get_template_directory_uri() . '/assets/css/archives.css';

    // 'wp-util' is a required dependency
    wp_enqueue_script( 'archives', $js_path, [ 'wp-util' ]);
    wp_enqueue_style( 'archives', $css_path);
}
?>

<?php get_header(); ?>

    <div class="container">

        <h2><?php the_title(); ?></h2>

        <form>
            <p class="search-title">Search this site:</p>
            <p class="search-input">
                <input type="text" class="input-box" id="search-input"/>
            </p>
        </form>

        <div class="results" id="results">
        </div>

    </div>

<?php get_footer(); ?>