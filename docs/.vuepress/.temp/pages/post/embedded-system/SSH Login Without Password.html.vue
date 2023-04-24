<template><div><h1 id="ssh-免密登录" tabindex="-1"><a class="header-anchor" href="#ssh-免密登录" aria-hidden="true">#</a> SSH 免密登录</h1>
<p>You want to use Linux and OpenSSH to automate your tasks. Therefore you need an <strong>automatic</strong> login from host A / user a to Host B / user b. You don't want to enter any passwords, because you want to call <code v-pre>ssh</code> from a within a shell script.</p>
<h2 id="how-to-do-it" tabindex="-1"><a class="header-anchor" href="#how-to-do-it" aria-hidden="true">#</a> How to do it</h2>
<p>First log in on A as user a and generate a pair of authentication keys. Do not enter a passphrase:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>a@A:~> ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/a/.ssh/id_rsa): 
Created directory '/home/a/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/a/.ssh/id_rsa.
Your public key has been saved in /home/a/.ssh/id_rsa.pub.
The key fingerprint is:
3e:4f:05:79:3a:9f:96:7c:3b:ad:e9:58:37:bc:37:e4 a@A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now use <code v-pre>ssh</code> to create a directory <code v-pre>~/.ssh</code> as user b on B. (The directory may already exist, which is fine):</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>a@A:~> ssh b@B mkdir -p .ssh
b@B's password: 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Finally append a's new public key to <code v-pre>b@B:.ssh/authorized_keys</code> and enter b's password one last time:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>a@A:~> cat .ssh/id_rsa.pub | ssh b@B 'cat >> .ssh/authorized_keys'
b@B's password: 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>From now on you can log into B as b from A as a without password:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>a@A:~> ssh b@B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于普通用户，需要进行以下步骤，第一步不是必须的。</p>
<p><strong>A note</strong> from one of our readers: Depending on your version of SSH you might also have to do the following changes:</p>
<ul>
<li>Put the public key in <code v-pre>.ssh/authorized_keys2</code></li>
<li>Change the permissions of <code v-pre>.ssh</code> to <code v-pre>700</code></li>
<li>Change the permissions of <code v-pre>.ssh/authorized_keys2</code> to <code v-pre>640</code></li>
</ul>
</div></template>


