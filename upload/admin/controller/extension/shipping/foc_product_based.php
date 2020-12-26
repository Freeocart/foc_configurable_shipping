<?php

class ControllerExtensionShippingFocProductBased extends Controller {
	private $error = array();

	public function index() {
		$this->load->language('extension/shipping/foc_product_based');

		$this->document->setTitle($this->language->get('heading_title'));

    $this->load->model('setting/setting');
    $this->load->model('extension/shipping/foc_product_based');

		if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
			// hack: prevent cleaning json data
			if (isset($this->request->post['shipping_foc_product_based_rules'])) {
				$this->request->post['shipping_foc_product_based_rules'] = $_POST['shipping_foc_product_based_rules'];
			}

			$this->model_setting_setting->editSetting('shipping_foc_product_based', $this->request->post);

			$this->session->data['success'] = $this->language->get('text_success');

			$this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=shipping', true));
		}

		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}

		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'], true)
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_extension'),
			'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=shipping', true)
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('heading_title'),
			'href' => $this->url->link('extension/shipping/foc_product_based', 'user_token=' . $this->session->data['user_token'], true)
		);

		$data['action'] = $this->url->link('extension/shipping/foc_product_based', 'user_token=' . $this->session->data['user_token'], true);

		$data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=shipping', true);

		if (isset($this->request->post['shipping_foc_product_based_status'])) {
			$data['shipping_foc_product_based_status'] = $this->request->post['shipping_foc_product_based_status'];
		} else {
			$data['shipping_foc_product_based_status'] = $this->config->get('shipping_foc_product_based_status');
		}

		if (isset($this->request->post['shipping_foc_product_based_label'])) {
			$data['shipping_foc_product_based_label'] = $this->request->post['shipping_foc_product_based_label'];
		} else {
			$data['shipping_foc_product_based_label'] = $this->config->get('shipping_foc_product_based_label');
		}

		if (isset($this->request->post['shipping_foc_product_based_group'])) {
			$data['shipping_foc_product_based_group'] = $this->request->post['shipping_foc_product_based_group'];
		} else {
			$data['shipping_foc_product_based_group'] = $this->config->get('shipping_foc_product_based_group');
		}

		if (isset($this->request->post['shipping_foc_product_based_sort_order'])) {
			$data['shipping_foc_product_based_sort_order'] = $this->request->post['shipping_foc_product_based_sort_order'];
		} else {
			$data['shipping_foc_product_based_sort_order'] = $this->config->get('shipping_foc_product_based_sort_order');
    }

    if (isset($this->request->post['shipping_foc_product_based_geo_zone_id'])) {
			$data['shipping_foc_product_based_geo_zone_id'] = $this->request->post['shipping_foc_product_based_geo_zone_id'];
		} else {
			$data['shipping_foc_product_based_geo_zone_id'] = $this->config->get('shipping_foc_product_based_geo_zone_id');
		}

		if (isset($this->request->post['shipping_foc_product_based_rules'])) {
			$data['shipping_foc_product_based_rules'] = $this->request->post['shipping_foc_product_based_rules'];
		}
		else {
			$data['shipping_foc_product_based_rules'] = $this->config->get('shipping_foc_product_based_rules');
		}

    if (isset($this->request->post['shipping_foc_product_based_cost'])) {
			$data['shipping_foc_product_based_cost'] = $this->request->post['shipping_foc_product_based_cost'];
		}
		else {
			$data['shipping_foc_product_based_cost'] = $this->config->get('shipping_foc_product_based_cost');
    }

    if (isset($this->request->post['shipping_foc_product_based_disable_if_total_is_zero'])) {
			$data['shipping_foc_product_based_disable_if_total_is_zero'] = $this->request->post['shipping_foc_product_based_disable_if_total_is_zero'];
		}
		else {
			$data['shipping_foc_product_based_disable_if_total_is_zero'] = $this->config->get('shipping_foc_product_based_disable_if_total_is_zero');
    }

    if (isset($this->request->post['shipping_foc_product_based_tax_class_id'])) {
			$data['shipping_foc_product_based_tax_class_id'] = $this->request->post['shipping_foc_product_based_tax_class_id'];
		} else {
			$data['shipping_foc_product_based_tax_class_id'] = $this->config->get('shipping_foc_product_based_tax_class_id');
		}

    if (isset($this->request->post['shipping_foc_product_based_cost_increase_mode'])) {
			$data['shipping_foc_product_based_cost_increase_mode'] = $this->request->post['shipping_foc_product_based_cost_increase_mode'];
		} else {
			$data['shipping_foc_product_based_cost_increase_mode'] = $this->config->get('shipping_foc_product_based_cost_increase_mode');
		}

		$this->load->model('localisation/language');
		$this->load->model('localisation/currency');
		$this->load->model('localisation/country');
    $this->load->model('localisation/geo_zone');
    $this->load->model('localisation/tax_class');

		$data['tax_classes'] = $this->model_localisation_tax_class->getTaxClasses();
		$data['languages'] = $this->model_localisation_language->getLanguages();
		$data['language_id'] = $this->config->get('config_language_id');
		$data['language_code'] = $this->config->get('config_language');
		$data['geo_zones'] = $this->model_localisation_geo_zone->getGeoZones();

		$data['ocInfo'] = array();

		$countries = $this->model_localisation_country->getCountries();
		$currencies_list = $this->model_localisation_currency->getCurrencies();
		$currencies = array_values($currencies_list);

		$currency = $this->config->get('config_currency');

		$currency_symbol = $this->currency->getSymbolRight($currency);
		if (empty($currency_symbol)) {
			$currency_symbol = $this->currency->getSymbolLeft($currency);
		}

		$cost_increase_modes = $this->model_extension_shipping_foc_product_based->getCostIncreaseModes();
		$data['cost_increase_modes'] = [];
		foreach ($cost_increase_modes as $key => $label) {
			$data['cost_increase_modes'][] = [
				'title' => $this->language->get($label),
				'value' => $key
			];
		}

		foreach ($data['languages'] as $language) {
			$ocInfo = array(
				'languages' => array_values($data['languages']),
				'options' => $this->model_extension_shipping_foc_product_based->getOptionsList($language['language_id']),
				'optionsValues' => $this->model_extension_shipping_foc_product_based->getOptionsValuesList($language['language_id']),
				'attributeGroups' => $this->model_extension_shipping_foc_product_based->getAttributeGroupList($language['language_id']),
				'attributes' => $this->model_extension_shipping_foc_product_based->getAttributesList($language['language_id']),
				'currencies' => $currencies,
				'currencySymbol' => $currency_symbol,
        'countries' => $countries,
        'geoZones' => $data['geo_zones']
			);

			$data['ocInfo'][$language['language_id']] = json_encode($ocInfo, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
		}

		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');

		$this->document->addScript('view/javascript/foc_product_based/runtime-main.js');
		$this->document->addScript('view/javascript/foc_product_based/main.js');
		$this->document->addScript('view/javascript/foc_product_based/2.js');
		$this->document->addStyle('view/stylesheet/foc_product_based/main.css');

		$data['scripts'] = $this->document->getScripts();
		$data['styles'] = $this->document->getStyles();

		$this->response->setOutput($this->load->view('extension/shipping/foc_product_based', $data));
	}

	protected function validate() {
		if (!$this->user->hasPermission('modify', 'extension/shipping/foc_product_based')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		return !$this->error;
	}
}