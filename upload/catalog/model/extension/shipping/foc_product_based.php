<?php

class ModelExtensionShippingFocProductBased extends Model {

	const OPTION_VALUE_IS_ANY = -1;

	/*
		How total will be calculated
	*/
	const RULES_TOTAL_SET_MAX_INCREASE_VALUE = 0;
	const RULES_TOTAL_SET_MIN_INCREASE_VALUE = 1;
	const RULES_TOTAL_SUM_INCREASE_VALUES = 2;
	const RULES_TOTAL_SET_MIN_NON_ZERO_INCREASE_VALUE = 3;

	const PRODUCT_INCREASE_STRATEGY_MAX = 0;
	const PRODUCT_INCREASE_STRATEGY_MIN = 1;
	const PRODUCT_INCREASE_STRATEGY_SUM = 2;
	const PRODUCT_INCREASE_STRATEGY_MIN_NON_ZERO = 3;

	const COST_INCREASE_MODE_MAX = 0;
  const COST_INCREASE_MODE_MIN = 1;
	const COST_INCREASE_MODE_SUM = 2;
	const COST_INCREASE_MODE_NON_ZERO_INCREASE = 3;
	const COST_INCREASE_MODE_MIN_NON_ZERO = 4;

	const RULESET_RESOLVER_SET_POSITION_VALUE = 0;
	const RULESET_RESOLVER_SET_POSITION_ITEM_VALUE = 1;
	const RULESET_RESOLVER_ADD_POSITION_VALUE = 2;
	const RULESET_RESOLVER_ADD_POSITION_ITEM_VALUE = 3;

	/*
		Init vars
	*/
	public function __construct ($registry) {
		parent::__construct($registry);
		$this->_config = $this->__initConfig();

		$this->_validTotalModes = [
			self::RULES_TOTAL_SET_MAX_INCREASE_VALUE,
			self::RULES_TOTAL_SET_MIN_INCREASE_VALUE,
			self::RULES_TOTAL_SUM_INCREASE_VALUES,
			self::RULES_TOTAL_SET_MIN_NON_ZERO_INCREASE_VALUE
		];
		$this->_defaultTotalMode = self::RULES_TOTAL_SET_MAX_INCREASE_VALUE;

		$this->_validProductIncreaseStrategies = [
			self::PRODUCT_INCREASE_STRATEGY_MAX,
			self::PRODUCT_INCREASE_STRATEGY_MIN,
			self::PRODUCT_INCREASE_STRATEGY_SUM,
			self::PRODUCT_INCREASE_STRATEGY_MIN_NON_ZERO
		];
		$this->_defaultProductIncreaseStrategy = self::PRODUCT_INCREASE_STRATEGY_MAX;

		$this->_validTotalCostIncreaseModes = [
			self::COST_INCREASE_MODE_MAX,
			self::COST_INCREASE_MODE_MIN,
			self::COST_INCREASE_MODE_SUM,
			self::COST_INCREASE_MODE_NON_ZERO_INCREASE,
			self::COST_INCREASE_MODE_MIN_NON_ZERO
		];
		$this->_defaultTotalCostIncreaseMode = self::COST_INCREASE_MODE_MAX;

		$this->deliveryInfo = null;
	}

	/*
		Load config object
	*/
	public function __initConfig () {
		$raw = $this->config->get('shipping_foc_product_based_rules');
		$language_id = $this->config->get('config_language_id');

		if (isset($raw[$language_id])) {
			return json_decode($raw[$language_id], true);
		}

		return [];
	}

	/*
		Get rules object
		{
			objID: {
				rule
			}
		}
	*/
	public function getRulesets () {
		if (isset($this->_config['rulesets']) && is_array($this->_config['rulesets'])) {
			return $this->_config['rulesets'];
		}

		return [];
	}

	/*
		Get totalMode int
	*/
	public function getTotalCalculationMode () {
		if (isset($this->_config['totalMode'])) {
			$totalMode = $this->_config['totalMode'];

			if (in_array($totalMode, $this->_validTotalModes)) {
				return (int)$totalMode;
			}
		}

		return $this->_defaultTotalMode;
	}

	public function getProductIncreaseStrategy () {
		if (isset($this->_config['productIncreaseStrategy'])) {
			$increaseStrategy = $this->_config['productIncreaseStrategy'];

			if (in_array($increaseStrategy, $this->_validProductIncreaseStrategies)) {
				return (int)$increaseStrategy;
			}
		}

		return $this->_defaultProductIncreaseStrategy;
	}

	public function getTotalCostIncreaseMode () {
		$mode = $this->config->get('shipping_foc_product_based_cost_increase_mode');

		if (in_array($mode, $this->_validTotalCostIncreaseModes)) {
			return (int)$mode;
		}

		return $this->_defaultTotalCostIncreaseMode;
	}

	/*
		Check if rule valid for product
	*/
	public function checkRuleForProduct ($product, $rule) {
		switch ($rule['type']) {
			case 'option':
				if (empty($product['option']) || empty($rule['option_value_id'])) {
					return false;
				}

				$ruleOptionId = (int)$rule['option_id'];
				$ruleValue = is_null($rule['option_value_id']) ? null : (int)$rule['option_value_id'];
				$skipValueCheck = $ruleValue === self::OPTION_VALUE_IS_ANY;

				foreach ($product['option'] as $option) {
					if ((int)$option['option_id'] === $ruleOptionId) {
						if ($skipValueCheck || (int)$option['option_value_id'] === $ruleValue) {
							return true;
						}
					}
				}
			break;
			case 'language':
				if (!isset($rule['language_id'])) {
					return false;
				}

				$language_id = (int) $this->config->get('config_language_id');

				if ($language_id === (int) $rule['language_id']) {
					return true;
				}
			break;
			case 'currency':
				if (!isset($rule['currency_id'])) {
					return false;
				}

				$this->load->model('localisation/currency');
				$currency_code = $this->session->data['currency'];
				$currency = $this->model_localisation_currency->getCurrencyByCode($currency_code);

				if ((int) $currency['currency_id'] === (int) $rule['currency_id']) {
					return true;
				}
			break;
			case 'countries':
				if (!isset($rule['countries_ids']) || !is_array($rule['countries_ids'])) {
					return false;
				}

				$country = $this->deliveryInfo['country_id']; //$this->session->data['shipping_address']['country_id'];

				if (in_array($country, $rule['countries_ids'])) {
					return true;
				}
			break;
			case 'attribute':
				if (!isset($rule['attribute_group_id']) || !isset($rule['attribute_id'])) {
					return false;
				}

				$attributesGroups = $this->model_catalog_product->getProductAttributes($product['product_id']);

				if (empty($attributesGroups)) {
					return false;
				}

				foreach ($attributesGroups as $attributeGroup) {
					if ( (int) $rule['attribute_group_id'] === (int) $attributeGroup['attribute_group_id']) {
						foreach ($attributeGroup['attribute'] as $attribute) {
							if ((int) $rule['attribute_id'] === (int) $attribute['attribute_id']) {
								if ($rule['check_value']) {
									if ($rule['attribute_value'] === $attribute['text']) {
										return true;
									}
									return false;
								}
								return true;
							}
						}
					}
				}
			break;
			case 'geozones':
				if (!isset($rule['zone_id'])) {
					return false;
				}

				$customerGeoZones = $this->db->query("SELECT * FROM " . DB_PREFIX . "zone_to_geo_zone WHERE country_id = '" . (int)$this->deliveryInfo['country_id'] . "' AND (zone_id = '" . (int)$this->deliveryInfo['zone_id'] . "' OR zone_id = '0')");

				if ($customerGeoZones->num_rows > 0) {
					foreach ($customerGeoZones->rows as $customerGeoZone) {
						if ((int) $customerGeoZone['geo_zone_id'] === (int) $rule['zone_id']) {
							return true;
						}
					}
				}

			break;
		}

		return false;
	}

	/*
		Check all existing rules for product
	*/
	public function checkValidRulesetsToApplyForProduct ($product, $rulesets = array(), $used = array()) {
		$rulesetsToApply = [];

		if ($rulesets === null) {
			return $rulesetsToApply;
		}

		foreach ($rulesets as $id => $config) {
			$checks = [];

			foreach ($config['rules'] as $rule) {
				$checks[] = $this->checkRuleForProduct($product, $rule);
			}

			if (count(array_unique($checks)) === 1 && current($checks) === true) {
				$rulesetsToApply[] = [
					'id' => $id,
					'increase' => $config['increase'],
					'useLabel' => $config['useLabel'],
					'label' => $config['label'],
					'once' => $config['once']
				];
			}
		}

		return $rulesetsToApply;
	}

	public function reduceRulesetsToApply ($rulesets, $mode) {
		switch ($mode) {
			case self::RULES_TOTAL_SET_MAX_INCREASE_VALUE:
				return array_reduce($rulesets, [ $this, '__maxByIncreaseValue' ], []);
			case self::RULES_TOTAL_SET_MIN_INCREASE_VALUE:
				return array_reduce($rulesets, [ $this, '__minByIncreaseValue' ], []);
			case self::RULES_TOTAL_SET_MIN_NON_ZERO_INCREASE_VALUE:
				return array_reduce($rulesets, [ $this, '__minNonZeroByIncreaseValue'], []);
			default:
				return [];
		}
	}

	protected function __maxByIncreaseValue ($prev, $current) {
		return (empty($prev) || $prev['increase'] < $current['increase']) ? $current : $prev;
	}

	protected function __minByIncreaseValue ($prev, $current) {
		return (empty($prev) || $prev['increase'] > $current['increase']) ? $current : $prev;
	}

	protected function __minNonZeroByIncreaseValue ($prev, $current) {
		if (empty($prev)) {
			return $current;
		}

		if ($prev['increase'] > 0 && $current['increase'] > 0) {
			return $prev['increase'] < $current['increase'] ? $prev : $current;
		}
		else {
			// return max
			return $prev['increase'] < $current['increase'] ? $current : $prev;
		}
	}

	protected function __greater_than_zero ($value = 0) {
		return $value > 0;
	}

	protected function __sum ($prev = 0, $value = 0) {
		return $prev + $value;
	}

	public function rulesetToTotals ($ruleset, $quantity = 1) {
		$total = array(
			'code'       => 'shipping_foc_product_based',
			'title'      => $ruleset['label'],
			'value'      => $this->calculateRulesetIncreaseTotal($ruleset, $quantity),
			'sort_order' => 10,
		);

		return $total;
	}

	public function calculateRulesetIncreaseTotal ($ruleset, $quantity = 1) {
		if ($ruleset['once']) {
			return $ruleset['increase'];
		}
		else {
			return $ruleset['increase'] * $quantity;
		}
	}


	/*
		Calculate product increase and return as [ 'exclude' => bool, 'increase' => num ]
	*/
	public function checkProductBasedIncreaseRule ($product, $rules = []) {
		$useRule = false;
		$increase = [];
		$result = [
			'exclude' => false,
			'increase' => 0
		];

		foreach ($rules as $rule) {
			$checks = [];

			foreach ($rule['conditions'] as $ruleCondition) {
				// check rule
				$checks[] = $this->checkRuleForProduct($product, $ruleCondition);
			}

			// use first?
			if (!$useRule && count(array_unique($checks)) === 1 && current($checks) === true) {
				$useRule = true;
				$increase = $rule['resolve'];
			}
		}

		if (isset($increase['type']) && isset($increase['value'])) {
			switch ($increase['type']) {
				case self::RULESET_RESOLVER_SET_POSITION_VALUE:
					$result['increase'] = $increase['value'];
					$result['exclude'] = true;
					break;
				case self::RULESET_RESOLVER_SET_POSITION_ITEM_VALUE:
					$result['increase'] = $increase['value'] * $product['quantity'];
					$result['exclude'] = true;
					break;
				case self::RULESET_RESOLVER_ADD_POSITION_VALUE:
					$result['increase'] += $increase['value'];
					$result['exclude'] = false;
					break;
				case self::RULESET_RESOLVER_ADD_POSITION_ITEM_VALUE:
					$result['increase'] += $increase['value'] * $product['quantity'];
					$result['exclude'] = false;
					break;
			}
		}

		return $result;
	}

	/*
		Product based increases
		Returns increase value and products list that can be processed with other increases
		[ 'increase' => num, 'products' => [] ]
	*/
	public function checkProductBasedIncreases ($products = array()) {
		$ids = array_column($products, 'product_id');
		$increase = 0;
		$processableProducts = [];

		if (count($ids) > 0) {
			$productSettingsSql = 'SELECT product_id, settings FROM ' . DB_PREFIX . 'foc_product_shipping_settings WHERE product_id IN (' . implode(',', $ids) . ');';

			$productSettings = $this->db->query($productSettingsSql);

			if ($productSettings->num_rows > 0) {
				foreach ($productSettings->rows as $productSettingsRow) {
					$productIndex = array_search($productSettingsRow['product_id'], $ids);
					$settings = json_decode($productSettingsRow['settings'], true);

					if (isset($settings['rules']) && count($settings['rules']) > 0) {
						/*
							[ exclude: bool, increase: number ]
						*/
						$productIncrease = $this->checkProductBasedIncreaseRule($products[$productIndex], $settings['rules']);
						$increase += $productIncrease['increase'];
						// if exclude is true then we drop product from processing
						// else add it to processable
						if ($productIncrease['exclude'] === false) {
							$processableProducts[] = $products[$productIndex];
						}
					}
					else {
						// if we havent any product based rule - add it to processable
						$processableProducts[] = $products[$productIndex];
					}
				}
			}
			else {
				// if we havent any product based increases - just mark all products as processable
				$processableProducts = $products;
			}
		}

		$result = [
			'increase' => $increase,
			'products' => $processableProducts
		];

		return $result;
	}

	/*
		Opencart getQuote API
	*/
	public function getQuote ($address) {
		$this->load->model('catalog/product');
		$this->load->language('extension/shipping/foc_product_based');
		$this->deliveryInfo = $address;

		$status = false;

		if (!$this->config->get('shipping_foc_product_based_geo_zone_id')) {
			$status = true;
		}
		else {
			$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "zone_to_geo_zone WHERE geo_zone_id = '" . (int)$this->config->get('shipping_foc_product_based_geo_zone_id') . "' AND country_id = '" . (int)$address['country_id'] . "' AND (zone_id = '" . (int)$address['zone_id'] . "' OR zone_id = '0')");

			if ($query->num_rows) {
				$status = true;
			}
		}

		$methodData = array();
		$quoteData = array();

		if ($status) {
			$cost = $this->config->get('shipping_foc_product_based_cost');

			$rulesets = $this->getRulesets();

			$increaseTotal = 0;
			$labels = [];

			$calculationMode = $this->getTotalCalculationMode();
			$increaseStrategy = $this->getProductIncreaseStrategy();

			$productsIncreases = [];

			$productCheckResult = $this->checkProductBasedIncreases($this->cart->getProducts());

			foreach ($productCheckResult['products'] as $product) {
				$rulesetsToApply = $this->checkValidRulesetsToApplyForProduct($product, $rulesets);

				$appliedRulesetsIncrease = 0;

				if (!empty($rulesetsToApply)) {
					$reduced = [];

					if ($calculationMode === self::RULES_TOTAL_SUM_INCREASE_VALUES) {
						$reduced = $rulesetsToApply;
					}
					else {
						$reduced = [ $this->reduceRulesetsToApply($rulesetsToApply, $calculationMode) ];
					}

					if (!empty($reduced)) {
						foreach ($reduced as $ruleset) {
							$rulesetIncrease = $this->calculateRulesetIncreaseTotal($ruleset, $product['quantity']);
							$appliedRulesetsIncrease += $rulesetIncrease;

							if ($ruleset['useLabel']) {
								if (!isset($labels[$ruleset['id']])) {
									$labels[$ruleset['id']] = $this->rulesetToTotals($ruleset, $product['quantity']);
								}
								else {
									$labels[$ruleset['id']]['value'] += $rulesetIncrease;
								}
							}
						}
					}
				}

				$productsIncreases[] = $appliedRulesetsIncrease;
			}

			if (count($productsIncreases) > 0) {
				switch ($increaseStrategy) {
					case self::PRODUCT_INCREASE_STRATEGY_MAX:
						$increaseTotal = max($productsIncreases);
					break;
					case self::PRODUCT_INCREASE_STRATEGY_MIN:
						$increaseTotal = min($productsIncreases);
					break;
					case self::PRODUCT_INCREASE_STRATEGY_MIN_NON_ZERO:
						$nonZero = array_filter($productsIncreases, [ $this, '__greater_than_zero' ]);
						if (count($nonZero) > 0) {
							$increaseTotal = min($nonZero);
						}
					break;
					case self::PRODUCT_INCREASE_STRATEGY_SUM:
						$increaseTotal = array_reduce($productsIncreases, [ $this, '__sum' ], 0);
					break;
				}
			}

			$totalCostIncreaseMode = $this->getTotalCostIncreaseMode();

			$totalCost = $cost;

			switch ($totalCostIncreaseMode) {
				case self::COST_INCREASE_MODE_MAX:
					$totalCost = max([ $cost, $increaseTotal ]);
				break;
				case self::COST_INCREASE_MODE_MIN:
					$totalCost = min([ $cost, $increaseTotal ]);
				break;
				case self::COST_INCREASE_MODE_MIN_NON_ZERO:
					$nonZero = array_filter([ $cost, $increaseTotal ], [ $this, '__greater_than_zero' ]);
					if (count($nonZero) > 0) {
						$totalCost = min($nonZero);
					}
					else {
						$totalCost = 0;
					}
				case self::COST_INCREASE_MODE_NON_ZERO_INCREASE:
					$totalCost = $increaseTotal > 0 ? $increaseTotal : 0;
				break;
				default:
					$totalCost = $cost + $increaseTotal;
				break;
			}

			/*
				Sum calculated totalCost and product based increase
			*/
			$totalCost += $productCheckResult['increase'];

			$disable_if_total_is_zero = $this->config->get('shipping_foc_product_based_disable_if_total_is_zero');

			// disable shipping if zero and option enabled
			if ($disable_if_total_is_zero && $totalCost <= 0) {
				return;
			}

			$language_id = $this->config->get('config_language_id');
			$shipping_labels = $this->config->get('shipping_foc_product_based_label');
			$shipping_groups = $this->config->get('shipping_foc_product_based_group');

			$label = isset($shipping_labels[$language_id]) ? $shipping_labels[$language_id] : '';
			$group = isset($shipping_groups[$language_id]) ? $shipping_groups[$language_id] : '';

			$customLabel = array_pop($labels);

			if (!empty($customLabel['title'])) {
				$label = $customLabel['title'];
			}

			$quoteData['foc_product_based'] = array(
				'code' => 'foc_product_based.foc_product_based',
				'title'        => empty($label) ? $this->language->get('text_label_fallback') : $label, //$this->language->get('text_description'),
				'cost'         => $totalCost,
				'tax_class_id' => $this->config->get('shipping_foc_product_based_tax_class_id'),
				'text'         => $this->currency->format($this->tax->calculate($totalCost, $this->config->get('shipping_foc_product_based_tax_class_id'), $this->config->get('config_tax')), $this->session->data['currency'])
			);

			$methodData = array(
				'code'       => 'foc_product_based',
				'title'      => empty($group) ? $this->language->get('text_group_fallback') : $group,
				'quote'      => $quoteData,
				'sort_order' => $this->config->get('shipping_foc_product_based_sort_order'),
				'error'      => false
			);
		}

		return $methodData;
	}
}