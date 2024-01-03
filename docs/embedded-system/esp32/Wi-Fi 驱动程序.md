# Wi-Fi 驱动程序

## ESP32-S3 Wi-Fi 功能列表

ESP32-S3 支持以下 Wi-Fi 功能：

- 支持 4 个虚拟接口，即 STA、AP、Sniffer 和 reserved。
- 支持仅 station 模式、仅 AP 模式、station/AP 共存模式
- 支持使用 IEEE 802.11b、IEEE 802.11g、IEEE 802.11n 和 API 配置协议模式
- 支持 WPA/WPA2/WPA3/WPA2-企业版/WPA3-企业版/WAPI/WPS 和 DPP
- 支持 AMSDU、AMPDU、HT40、QoS 以及其它主要功能
- 支持 Modem-sleep
- 支持乐鑫专属协议，可实现 **1 km** 数据通信量
- 空中数据传输最高可达 20 MBit/s TCP 吞吐量和 30 MBit/s UDP 吞吐量
- 支持 Sniffer
- 支持快速扫描和全信道扫描
- 支持多个天线
- 支持获取信道状态信息

## ESP32-S3 Wi-Fi API 错误代码

所有 ESP32-S3 Wi-Fi API 都有定义好的返回值，即错误代码。这些错误代码可分类为：

- 无错误，例如：返回值 `ESP_OK`代表 API 成功返回
- 可恢复错误，例如：`ESP_ERR_NO_MEM`
- 不可恢复的非关键性错误
- 不可恢复的关键性错误

一个错误是否为关键性取决于其 API 和应用场景，并且由 API 用户定义。

## ESP32-S3 Wi-Fi 编程模型

![*Wi-Fi 编程模型*](/assets/img/esp32/wifi/wifi_program_prototype.png)

Wi-Fi 驱动程序可以看作是一个无法感知上层代码（如 TCP/IP 堆栈、应用程序任务、事件任务等）的黑匣子。通常，应用程序任务（代码）负责调用 [Wi-Fi 驱动程序 APIs](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html) 来初始化 Wi-Fi，并在必要时处理 Wi-Fi 事件。然后，Wi-Fi 驱动程序接收并处理 API 数据，并在应用程序中插入事件。

```c
esp_netif_init();

esp_event_loop_create_default();
esp_netif_create_default_wifi_sta();

wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
esp_wifi_init(&cfg);
```

Wi-Fi 事件处理是在 [esp_event 库](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/esp_event.html) 的基础上进行的。Wi-Fi 驱动程序将事件发送至 [默认事件循环](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/esp_event.html#esp-event-default-loops)，应用程序便可以使用 [`esp_event_handler_register()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/system/esp_event.html#_CPPv426esp_event_handler_register16esp_event_base_t7int32_t19esp_event_handler_tPv) 中的回调函数处理这些事件。除此之外，[esp_netif 组件](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_netif.html) 也负责处理 Wi-Fi 事件，并产生一系列默认行为。例如，当 Wi-Fi station 连接至一个 AP 时，esp_netif 将自动开启 DHCP 客户端服务（系统默认）。

```c
static void event_handler(void* arg, esp_event_base_t event_base,
                                int32_t event_id, void* event_data)
{
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
        esp_wifi_connect();
    } else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
        if (s_retry_num < EXAMPLE_ESP_MAXIMUM_RETRY) {
            esp_wifi_connect();
            s_retry_num++;
            ESP_LOGI(TAG, "retry to connect to the AP");
        } else {
            xEventGroupSetBits(s_wifi_event_group, WIFI_FAIL_BIT);
        }
        ESP_LOGI(TAG,"connect to the AP fail");
    } else if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        ip_event_got_ip_t* event = (ip_event_got_ip_t*) event_data;
        ESP_LOGI(TAG, "got ip:" IPSTR, IP2STR(&event->ip_info.ip));
        s_retry_num = 0;
        xEventGroupSetBits(s_wifi_event_group, WIFI_CONNECTED_BIT);
    }
}

esp_event_handler_instance_t instance_any_id;
esp_event_handler_instance_t instance_got_ip;
ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,
                                                    ESP_EVENT_ANY_ID,
                                                    &event_handler,
                                                    NULL,
                                                    &instance_any_id));
ESP_ERROR_CHECK(esp_event_handler_instance_register(IP_EVENT,
                                                    IP_EVENT_STA_GOT_IP,
                                                    &event_handler,
                                                    NULL,
                                                    &instance_got_ip));
```

## ESP32-S3 Wi-Fi 事件描述

### WIFI event 声明

```c
/** WiFi event declarations */
typedef enum {
    WIFI_EVENT_SCAN_DONE=1,                /**< ESP32 finish scanning AP */
    WIFI_EVENT_STA_START,                /**< ESP32 station start */
    WIFI_EVENT_STA_STOP,                 /**< ESP32 station stop */
    WIFI_EVENT_STA_CONNECTED,            /**< ESP32 station connected to AP */
    WIFI_EVENT_STA_DISCONNECTED,         /**< ESP32 station disconnected from AP */
    WIFI_EVENT_STA_AUTHMODE_CHANGE,      /**< the auth mode of AP connected by ESP32 station changed */

    WIFI_EVENT_STA_WPS_ER_SUCCESS,       /**< ESP32 station wps succeeds in enrollee mode */
    WIFI_EVENT_STA_WPS_ER_FAILED,        /**< ESP32 station wps fails in enrollee mode */
    WIFI_EVENT_STA_WPS_ER_TIMEOUT,       /**< ESP32 station wps timeout in enrollee mode */
    WIFI_EVENT_STA_WPS_ER_PIN,           /**< ESP32 station wps pin code in enrollee mode */
    WIFI_EVENT_STA_WPS_ER_PBC_OVERLAP,   /**< ESP32 station wps overlap in enrollee mode */

    /**********/
    WIFI_EVENT_AP_START,                 /**< ESP32 soft-AP start */
    WIFI_EVENT_AP_STOP,                  /**< ESP32 soft-AP stop */
    WIFI_EVENT_AP_STACONNECTED,          /**< a station connected to ESP32 soft-AP */
    WIFI_EVENT_AP_STADISCONNECTED,       /**< a station disconnected from ESP32 soft-AP */
    WIFI_EVENT_AP_PROBEREQRECVED,        /**< Receive probe request packet in soft-AP interface */

    WIFI_EVENT_FTM_REPORT,               /**< Receive report of FTM procedure */

    /* Add next events after this only */
    WIFI_EVENT_STA_BSS_RSSI_LOW,         /**< AP's RSSI crossed configured threshold */
    WIFI_EVENT_ACTION_TX_STATUS,         /**< Status indication of Action Tx operation */
    WIFI_EVENT_ROC_DONE,                 /**< Remain-on-Channel operation complete */

    WIFI_EVENT_STA_BEACON_TIMEOUT,       /**< ESP32 station beacon timeout */

    WIFI_EVENT_CONNECTIONLESS_MODULE_WAKE_INTERVAL_START,   /**< ESP32 connectionless module wake interval start */

    WIFI_EVENT_MAX,                      /**< Invalid WiFi event ID */
} wifi_event_t;
```

#### WIFI_EVENT_SCAN_DONE

扫描完成事件，由 [`esp_wifi_scan_start()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv419esp_wifi_scan_startPK18wifi_scan_config_tb) 函数触发，将在以下情况下产生：

- 扫描已完成，例如：Wi-Fi 已成功找到目标 AP 或已扫描所有信道。
- 当前扫描因函数 [`esp_wifi_scan_stop()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv418esp_wifi_scan_stopv) 而终止。
- 在当前扫描完成之前调用了函数 [`esp_wifi_scan_start()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv419esp_wifi_scan_startPK18wifi_scan_config_tb)。此时，新的扫描将覆盖当前扫描过程，并生成一个扫描完成事件。

以下情况下将不会产生扫描完成事件：

- 当前扫描被阻止。
- 当前扫描是由函数 [`esp_wifi_connect()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv416esp_wifi_connectv) 触发的。

接收到此事件后，事件任务暂不做任何响应。首先，应用程序的事件回调函数需调用[`esp_wifi_scan_get_ap_num()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv424esp_wifi_scan_get_ap_numP8uint16_t) 和 [`esp_wifi_scan_get_ap_records()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv428esp_wifi_scan_get_ap_recordsP8uint16_tP16wifi_ap_record_t) 获取已扫描的 AP 列表，然后触发 Wi-Fi 驱动程序释放在扫描过程中占用的内存空间（**切记该步骤**）。

#### WIFI_EVENT_STA_START

如果调用函数 [`esp_wifi_start()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv414esp_wifi_startv) 后接收到返回值 `ESP_OK`，且当前 Wi-Fi 处于 station 或 station/AP 共存模式，则将产生此事件。<u>接收到此事件后，事件任务将初始化 LwIP 网络接口 (netif)。通常，应用程序的事件回调函数需调用 [`esp_wifi_connect()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv416esp_wifi_connectv) 来连接已配置的 AP。</u>

#### WIFI_EVENT_STA_CONNECTED

如果调用函数 [`esp_wifi_connect()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv416esp_wifi_connectv)  后接收到返回值 `ESP_OK`，且 station 已成功连接目标 AP，则将产生此连接事件。<u>接收到此事件后，事件任务将启动 DHCP 客户端服务并开始获取 IP 地址。此时，Wi-Fi 驱动程序已准备就绪，可发送和接收数据。</u>如果你的应用程序不依赖于 LwIP（即 IP 地址），则此刻便可以开始应用程序开发工作。<u>但是，如果你的应用程序需基于 LwIP 进行，则还需等待 *got ip* 事件发生后才可开始。</u>

#### WIFI_EVENT_STA_STOP

如果调用函数 [`esp_wifi_stop()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv413esp_wifi_stopv) 后接收到返回值 `ESP_OK`，且当前 Wi-Fi 处于 station 或 station/AP 共存模式，则将产生此事件。<u>接收到此事件后，事件任务将进行释放 station IP 地址、终止 DHCP 客户端服务、移除 TCP/UDP 相关连接并清除 LwIP station netif 等动作。</u>此时，应用程序的事件回调函数通常不需做任何响应。

#### WIFI_EVENT_STA_DISCONNECTED

此事件将在以下情况下产生：

- <u>调用了函数 [`esp_wifi_disconnect()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv419esp_wifi_disconnectv) 或 [`esp_wifi_stop()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv413esp_wifi_stopv)，且 Wi-Fi station 已成功连接至 AP</u>。
- 调用了函数 [`esp_wifi_connect()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv416esp_wifi_connectv)，但 Wi-Fi 驱动程序因为某些原因<u>未能成功连接至 AP</u>，例如：未扫描到目标 AP、验证超时等。或存在多个 SSID 相同的 AP，station 无法连接所有已找到的 AP，也将产生该事件。
- Wi-Fi 连接因为某些原因而中断，例如：station 连续多次丢失 N beacon、AP 踢掉 station、AP 认证模式改变等。

接收到此事件后，事件任务的默认动作为：

- 关闭 station 的 LwIP netif。
- 通知 LwIP 任务清除导致所有套接字状态错误的 UDP/TCP 连接。针对基于套接字编写的应用程序，其回调函数可以在接收到此事件时（如有必要）关闭并重新创建所有套接字。

应用程序处理此事件最常用的方法为：调用函数 [`esp_wifi_connect()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv416esp_wifi_connectv) 重新连接 Wi-Fi。**但是，如果此事件是由函数 [`esp_wifi_disconnect()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv419esp_wifi_disconnectv) 引发的，则应用程序不应调用 [`esp_wifi_connect()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv416esp_wifi_connectv) 来重新连接。**

需要注意的另一点是：接收到此事件后，LwIP 的默认动作是终止所有 TCP 套接字连接。大多数情况下，该动作不会造成影响。但对某些特殊应用程序可能除外。例如：

- 应用程序创建一个了 TCP 连接，以维护每 60 秒发送一次的应用程序级、保持活动状态的数据。
- 由于某些原因，Wi-Fi 连接被切断并引发了 WIFI_EVENT_STA_DISCONNECTED 事件。根据当前实现，此时所有 TCP 连接都将被移除，且保持活动的套接字将处于错误的状态中。但是，由于应用程序设计者认为网络层 **不应** 考虑这个 Wi-Fi 层的错误，因此应用程序不会关闭套接字。
- 5 秒后，因为在应用程序的事件回调函数中调用了 [`esp_wifi_connect()`](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32s3/api-reference/network/esp_wifi.html#_CPPv416esp_wifi_connectv)，Wi-Fi 连接恢复。**同时，station 连接至同一个 AP 并获得与之前相同的 IPV4 地址。**
- 60 秒后，当应用程序发送具有保持活动状态的套接字的数据时，套接字将返回错误，应用程序将关闭套接字并在必要时重新创建。

### IP event 声明

```c
/** IP event declarations */
typedef enum {
    IP_EVENT_STA_GOT_IP,               /*!< station got IP from connected AP */
    IP_EVENT_STA_LOST_IP,              /*!< station lost IP and the IP is reset to 0 */
    IP_EVENT_AP_STAIPASSIGNED,         /*!< soft-AP assign an IP to a connected station */
    IP_EVENT_GOT_IP6,                  /*!< station or ap or ethernet interface v6IP addr is preferred */
    IP_EVENT_ETH_GOT_IP,               /*!< ethernet got IP from connected AP */
    IP_EVENT_ETH_LOST_IP,              /*!< ethernet lost IP and the IP is reset to 0 */
    IP_EVENT_PPP_GOT_IP,               /*!< PPP interface got IP */
    IP_EVENT_PPP_LOST_IP,              /*!< PPP interface lost IP */
} ip_event_t;
```

