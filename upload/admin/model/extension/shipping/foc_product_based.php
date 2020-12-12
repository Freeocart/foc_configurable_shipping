<?php

class ModelExtensionShippingFocProductBased extends Model {
  const COST_INCREASE_MODE_MAX = 0;
  const COST_INCREASE_MODE_MIN = 1;
  const COST_INCREASE_MODE_SUM = 2;
  const COST_INCREASE_MODE_NON_ZERO_INCREASE = 3;
  const COST_INCREASE_MODE_MIN_NON_ZERO = 4;

  public function install () {

  }

  public function uninstall () {

  }

  public function getCostIncreaseModes () {
    return [
      self::COST_INCREASE_MODE_MAX => 'entry_cost_increase_mode_max',
      self::COST_INCREASE_MODE_MIN => 'entry_cost_increase_mode_min',
      self::COST_INCREASE_MODE_MIN_NON_ZERO => 'entry_cost_increase_mode_min_nonzero',
      self::COST_INCREASE_MODE_SUM => 'entry_cost_increase_mode_sum',
      self::COST_INCREASE_MODE_NON_ZERO_INCREASE => 'entry_cost_increase_mode_nonzero_increase'
    ];
  }

  public function getOptionsList ($language_id) {
    $sql = 'SELECT option_id,name FROM ' . DB_PREFIX . 'option_description WHERE language_id = ' . (int)$language_id;
    $result = $this->db->query($sql);
    return $result->rows;
  }

  public function getOptionsValuesList ($language_id) {
    $sql = 'SELECT option_value_id,option_id,name FROM ' . DB_PREFIX . 'option_value_description WHERE language_id = ' . (int)$language_id;
    $result = $this->db->query($sql);
    return $result->rows;
  }

  public function getAttributesList ($language_id) {
    $sql = 'SELECT `a`.attribute_id,`a`.attribute_group_id,`ad`.`name` FROM ' . DB_PREFIX . 'attribute_description AS `ad` LEFT JOIN ' . DB_PREFIX .'attribute AS `a` ON `a`.attribute_id = `ad`.attribute_id WHERE language_id = ' . (int)$language_id;
    $result = $this->db->query($sql);
    return $result->rows;
  }

  public function getAttributeGroupList ($language_id) {
    $sql = 'SELECT attribute_group_id, name FROM ' . DB_PREFIX . 'attribute_group_description WHERE language_id = ' . (int)$language_id;
    $result = $this->db->query($sql);
    return $result->rows;
  }

}