<?php

namespace Drupal\hello_world\Controller;

use Drupal\Core\Controller\ControllerBase;

class HelloWorldController extends ControllerBase {

  /**
   * Display the markup.
   *
   * @return array
   */
  public function hello() {
    return array(
        '#title' => 'Hello World',
        '#markup' => 'This is some content'
    );
  }

}
