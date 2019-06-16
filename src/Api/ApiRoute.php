<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2019-06-16
 * Time: 오후 2:20
 */

namespace App\Api;


use Symfony\Component\Routing\Annotation\Route;

/**
 * @Annotation
 */
class ApiRoute  extends Route
{
    public function getDefaults()
    {
        return array_merge(
          ['_is_api' => true],
          parent::getDefaults()
        );
    }

}