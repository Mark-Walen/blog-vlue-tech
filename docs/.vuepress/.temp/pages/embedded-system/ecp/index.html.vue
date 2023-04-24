<template><div><h1 id="电子通信协议" tabindex="-1"><a class="header-anchor" href="#电子通信协议" aria-hidden="true">#</a> 电子通信协议</h1>
<h2 id="通信" tabindex="-1"><a class="header-anchor" href="#通信" aria-hidden="true">#</a> 通信</h2>
<p>电子设备之间的通信就像是人与人之间的交流，都需要说相同的语言进行沟通。通信协议就是电子器件（嵌入式）进行通信时使用的语言。当我们构建大都数电子工程项目时，我们需要知道的通信协议很少。在接下来的一系列文章中，我们会讨论几种最基本、最常见的协议：SPI、I2C和UART。</p>
<p>SPI、I2C 和 UART虽然相对于其他通信协议会比较慢，如 USB、Ethernet、Bluetooth 和 WiFi，但是它们非常的简单，而且占用的硬件资源和系统资源非常的少。SPI、I2C 和 UART 非常适合微控制处理器之间的通信，也非常适合当微控制处理与传感器之间不需要传输大量高速数据时的通信。</p>
<h3 id="数据通信的类型" tabindex="-1"><a class="header-anchor" href="#数据通信的类型" aria-hidden="true">#</a> 数据通信的类型</h3>
<h4 id="并行通信基础" tabindex="-1"><a class="header-anchor" href="#并行通信基础" aria-hidden="true">#</a> 并行通信基础</h4>
<p><strong>特征:</strong></p>
<ul>
<li>并行通信中，所有数据的每一位同时传输在单独的通信线路上。（如果有四位通信线路，那么 2 (0010b) 的每一位就在四根线上同时传输，如图 1.1 所示。）</li>
<li>用于短距离传输</li>
<li>n 根线传输 n 位</li>
<li>比串行通信花费的代价更大，但传输速度要更快，数据传输花的时间更少</li>
</ul>
<h4 id="串行通信基础" tabindex="-1"><a class="header-anchor" href="#串行通信基础" aria-hidden="true">#</a> 串行通信基础</h4>
<p><strong>特征：</strong></p>
<ul>
<li>串行通信中，数据只在一根通信线路上传输，所以数据的每一位只能是一位接着一位的传输</li>
<li>将数据从发送方传输到接收方，只需要一根通信线路，而不是 n 根线路</li>
<li>所以数据的每一位都以串行的方式在一根线上传输</li>
</ul>
<p>串行通信有两种方式：</p>
<ul>
<li>异步（UART）
<ul>
<li>一次传输一位</li>
<li>不需要时钟信号</li>
</ul>
</li>
<li>同步（如：SPI、I2C）
<ul>
<li>一次传输一个数据块</li>
<li>需要时钟信号</li>
</ul>
</li>
</ul>
<p><strong>双工通信：</strong> 数据在传输中，数据可以被传输或接收</p>
<p><strong>单工通信：</strong> 数据在传输时使用的是一根通信线路，数据的传输是单向的：发送设备不能接收数据只能发送数据，接收设备也只能用来接收数据而不能发送数据。</p>
<p><strong>半双工通信：</strong> 数据在传输时使用的仍然是一根通信线路，但数据传输方向是双向的：通信线路两端的设备即可以是发送设备，也可以是接收设备，但是不能在发送数据的时，又接收数据，因为数据通信线路只有一根。</p>
<p><strong>全双工：</strong> 数据在传输时使用的是两根通信线路，数据传输方向是双向的：数据通信线路两端中的任意一端设备接收数据和发送数据可以同时进行</p>
<p><strong>协议：</strong> 发送方和接收方都同意的一套规则：</p>
<ul>
<li>数据是如何打包的</li>
<li>多少个比特构成一个字符</li>
<li>数据什么时候开始和结束</li>
</ul>
<div style="font-family: 'Times New Roman', 黑体, serif; font-size: 9pt; text-align: center;">表 1.1 串行通信协议</div>
<table>
<thead>
<tr>
<th>串行通信协议</th>
<th>同步/异步</th>
<th>类型</th>
<th>双工通信</th>
<th>数据传输速率（kbps）</th>
</tr>
</thead>
<tbody>
<tr>
<td>UART</td>
<td>异步</td>
<td>peer-to-peer</td>
<td>全双工</td>
<td>20</td>
</tr>
<tr>
<td>I2C</td>
<td>同步</td>
<td>multi-master</td>
<td>半双工</td>
<td>3400</td>
</tr>
<tr>
<td>SPI</td>
<td>同步</td>
<td>multi-master</td>
<td>全双工</td>
<td>&gt; 1,000</td>
</tr>
<tr>
<td>MICROWIRE</td>
<td>同步</td>
<td>master/slave</td>
<td>全双工</td>
<td>&gt; 625</td>
</tr>
<tr>
<td>I-WIRE</td>
<td>异步</td>
<td>master/slave</td>
<td>半双工</td>
<td>16</td>
</tr>
</tbody>
</table>
<p><strong>波特率的概念</strong>
在串行通信中，用<strong>每秒传输的比特数</strong>（bps）来衡量数据传输的速率，这也被称为<strong>波特率</strong>。波特率和 bps，相对于 UART，波特率和 bps 可以互换使用。</p>
<p><strong>例：</strong> 需要的传输的比特数为 10 页文本，每一页有 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>100</mn><mo>×</mo><mn>25</mn></mrow><annotation encoding="application/x-tex">100 \times 25</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">100</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">25</span></span></span></span> 个字符，每个字符有 8 个比特和一个开始位以及停止位：</p>
<p>一个字符共有 10 个比特，那么每页的比特数为 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>100</mn><mo>×</mo><mn>25</mn><mo>×</mo><mn>10</mn><mo>=</mo><mn>25</mn><mo separator="true">,</mo><mn>000</mn></mrow><annotation encoding="application/x-tex">100 \times 25 \times 10 = 25,000</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">100</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">25</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">10</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord">25</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">000</span></span></span></span>. 10 页的数据共有 250000 个比特。通常 SCI 的波特率是 1200，2400，4800，9600，19200 等。当波特率为 9600 时，传输这 250000 个比特，我们需要：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mn>250000</mn><mn>9600</mn></mfrac><mo>=</mo><mn>26.04</mn><mi>s</mi><mtext>  </mtext><mo stretchy="false">(</mo><mn>27</mn><mi>s</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\frac{250000}{9600} = 26.04s\;(27s)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">9600</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">250000</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">26.04</span><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mopen">(</span><span class="mord">27</span><span class="mord mathnormal">s</span><span class="mclose">)</span></span></span></span></p>
<h2 id="串行通信接口" tabindex="-1"><a class="header-anchor" href="#串行通信接口" aria-hidden="true">#</a> 串行通信接口</h2>
<p>串行通信协议分为同步和异步两类。1）在同步通信中，数据的传输和接收是速率恒定的连续流。**同步通信要求传输设备的时钟要与接收设备的时钟保持同步。**在大都数系统中，如 ADC、音频编码、电位器，数据的传输和接收以相同的频率发生。同步通信的例子：I2C、SPI 等。2）在异步通信中，数据的传输不需要时钟信号，同时数据的传输是间断的而不是恒定流。在异步通信中，传输设备与接收设备间的挥手信号非常的重要。异步通信的例子：UART、CAN 等。</p>
<p>同步和异步通信协议是定义明确的标准，并且软件和硬件都可以实现。在嵌入式系统早期，I2C 和 SPI 的软件实现很常见，也是一项非常繁琐的工作，并且用于执行较长的程序。渐渐地，大多数微控制器开始将标准通信协议作为硬件核心。90 年代初的这种发展使得嵌入式软件开发的工作更容易用于通信协议。</p>
<h3 id="uart" tabindex="-1"><a class="header-anchor" href="#uart" aria-hidden="true">#</a> UART</h3>
<p>在 UART 通信中，两个 UART 设备相互之间直接通信。发送 UART 将来自控制设备（如 CPU）的并行数据转换为串行数据，然后将串行数据发送给接收 UART，接收 UART 将串行数据转回并行数据。两个 UART 设备之间的数据传输只需要两根通信线，数据从发送 UART 的 TX 引脚流向接收 UART 的 RX 引脚。</p>
<p>UART 传输数据是异步的，这意味着没有时钟信号将发送 UART 比特的输出与接收 UART 比特的采样同步。发送 UART 在发送数据时，会给数据包添加一个开始和一个结束位来代替时钟信号，开始位和结束位定义了数据包的开始和结束，因此接收 UART 知道什么时候去读取数据。</p>
<p>当接收 UART 监测到一个开始位，它开始以特定频率（波特率）读取传入的比特。两个 UART 必须以大致相同的波特率运行。在位时序偏离太远之前，发送 UART 和接收 UART 之间波特率只能相差 10% 左右。</p>
<p>两个 UART 设备都必须配置传输以及接收相同的数据包结构。</p>
<table>
<thead>
<tr>
<th>使用的通信线路数</th>
<th>2</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>最大传输速率</strong></td>
<td>不超过 115200 baud，通常 9600 baud</td>
</tr>
<tr>
<td><strong>同步/异步</strong></td>
<td>异步</td>
</tr>
<tr>
<td><strong>串行/并行</strong></td>
<td>串行</td>
</tr>
<tr>
<td><strong>主节点数</strong></td>
<td>1</td>
</tr>
<tr>
<td><strong>从节点数</strong></td>
<td>1</td>
</tr>
</tbody>
</table>
<h4 id="uart-工作原理" tabindex="-1"><a class="header-anchor" href="#uart-工作原理" aria-hidden="true">#</a> UART 工作原理</h4>
<p>UART 发送的数据是从数据总线接收的。数据总线将来自其他设备的数据发送给 UART，如 CPU、内存和微控制处理器。数据总线以并行的方式将数据发送给传输 UART。在传输 UART 接收到来自数据总线的并行数据后，它添加了一个开始位，奇偶校验位和一个停止位，创建了数据包。接下来，数据包 TX 引脚处一位接着一位的串行输出。接收 UART 从它的 RX 引脚处一位接着一位的读取数据，然后将数据转回并行数据并移除开始位、校验位和停止位。最后，接收 UART 将数据以并行数据传输给数据总线。</p>
<p>UART 传输的数据会被组织成包，每个数据包包含：1个开始位、5-9数据位（取决于UART），一个可选的奇偶校验位，1-2个停止位。</p>
<p><strong>开始位</strong></p>
<p>当 UART 数据通信线不传输数据时，通常情况下会保持高电平。为了开始传输数据，传输 UART 将通信线会将高电平拉至低电平一个时钟周期，当接收端 UART 监测到高电平向低电平的变化，它开始以波特率的频率读取数据帧中的比特。</p>
<p><strong>数据帧</strong></p>
<p>数据帧包含实际传输的数据。如果包含奇偶校验位，那么它的长度可以达到 5 个比特或者 9 个比特。如果没有奇偶校验位，数据帧最大是 8 个比特。大多数情况下，数据的发送都是低位优先。</p>
<p><strong>奇偶校验位</strong></p>
<p>奇偶校验位描述了一个数是奇数还是偶数。奇偶校验位是接收 UART 判断数据在传输的过程中是否发送改变的一种方式。数据的位可以通过电磁辐射、波特率不匹配或者长距离数据传输改变。 在接收设备读取数据帧后，它开始统计数据帧中 1 的个数，并检查 1 的总数是奇数还是偶数。如果奇偶校验位是 1，那么数据帧中 1 的个数应该是奇数。数据帧中 1 的个数的奇偶性与奇偶校验位相符时，UART 接收设备就知道传输没有出现错误。但是如果奇偶校验位是 0，总数是奇数，或者奇偶校验位是 1，总数是偶数，UART 就知道数据帧中的比特已经变了。</p>
<p><strong>停止位</strong></p>
<p>停止位标志着数据包的结束。它通常是两位长但经常只有一位被使用。为了结束传输，发送 UART 让数据传输线保持在高电平状态。</p>
<h4 id="uart-传输步骤" tabindex="-1"><a class="header-anchor" href="#uart-传输步骤" aria-hidden="true">#</a> UART 传输步骤</h4>
<ol>
<li>传输 UART 接收来自数据总线的并行数据；</li>
<li>传输 UART 将开始位，奇偶校验位和结束位添加至数据帧；</li>
<li>整个数据包由发送 UART串行的传输给接收 UART。接收 UART 以预先配置的波特率对数据线进行数据采样接收；</li>
<li>接收 UART 丢弃数据帧中的开始位、奇偶校验位和结束位；</li>
<li>接收 UART 将串行数据转回并行数据并传输到接收端的数据总线。</li>
</ol>
<h4 id="uart-的优点和缺点" tabindex="-1"><a class="header-anchor" href="#uart-的优点和缺点" aria-hidden="true">#</a> UART 的优点和缺点</h4>
<p>没有通信协议是完美的，但是 UART 很擅长它们需要做的。</p>
<p><strong>优点</strong></p>
<ul>
<li>只使用两线</li>
<li>不需要时钟信号</li>
<li>有奇偶校验位，允许错误检查。</li>
<li>数据包的结构是可以改变的，只要双方都设置好了</li>
<li>资料多且使用广泛</li>
</ul>
<p><strong>缺点</strong></p>
<ul>
<li>数据帧大小被限制为不超过 9 位</li>
<li>不支持多主或多从模式</li>
<li>每个 UART 之间的波特率的差必须在 10% 以内。</li>
</ul>
<p>UART （通用异步收发器）是与串行通信湘桂的专用硬件。UART 的硬件可以是集成在微控制器上的电路或专用 IC。这与只是通信协议的 SPI 或 I2C 不同。</p>
<p>UART 是最简单和最常用的 串行通信技术之一。UART 有许多的应用，如 GPS 接收设备、蓝牙模块、GSM 和 GPRS 调制解调器、无线通信系统、基于 RFID 的应用等。</p>
</div></template>


