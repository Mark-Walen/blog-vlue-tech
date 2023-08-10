# 线性表
## 单链表

<img src="./assets/img/linear-table/traverse.gif" style="margin-top: 6px;">

### 存储结构

> 链式存储结构

问题1：<font size = 2px, color = "#ff0f">什么是链式存储结构？</font>

链式存储结构的特点：

用一组<mark>任意的</mark>存储单元存储线性表的数据元素。

**两个域**

1. 数据域：存储数据元素的信息。

2. 指针域：存储后继结点的存储位置（即地址）。

   <img src="/assets/img/linear-table/链式存储构成.png" alt="链式的结构" style="zoom:48%;" />

答案：<font color = "#aa">链表的存储单元在逻辑上是连续的，但在物理空间（存储单元）上不一定是连续的，用指针域存储地址，将所有结点链接在一起，形成一个链表，实现了逻辑上的连续。</font>

问题2：<font size = 2px, color = "#ff0f">链表如何存取信息?</font>

```c
typedef int ElemType;		//定义元素的数据类型
//------ 单链表的存储结构 ------
typedef struct LNode
{
    ElemType data;		//结点的数据域
    struct LNode *next;	//结点的指针域
}LNode, *LinkedList;	//LinkedList为指向结构体LNode的指针类型
```

<mark>代码说明1</mark>

<div style = "border: 1px solid">
    <ol>
        <li>LinkedList与LNode*，两者本质上是等价的。</li>
        <li>通常习惯上用LinkedList定义单链表</li>
        <li>用LNode *定义指向单链表中任意结点的指针变量。</li>
        <li>若定义LinkedList L，L为单链表的头指针；若定义LNode *p，则p为指向单链表中某个结点的指针。</li>
        <li>单链表是由表头指针唯一确定的，因此单链表可以用头指针的名字来命名。</li>
    </ol>
</div>

<mark>注意</mark>：

<div>
    区分指针变量和结点变量两个不同的概念:
    <ul>
        <li>指针变量：p，表示结点的地址</li>
        <li>结点变量：*p，表示该结点的名称</li>
    </ul>
</div>


答案：<font color = "#aa">（1）代码说明1的第5点。（2）在单链表中，每个结点都只有一个指针域，且只指向后继结点。所以当我们要存取某个结点的信息时，只能从头指针开始。</font>

### 单链表基本操作的实现

#### 创建结点

```c
LNode CreateNode(ElemType data)
{
    LNode *node = malloc(sizeof(LNode));		//开辟空间生成结点
    node->data = data;							//数据域赋值
    node->next = NULL;							//指针域指向空
    return node;
}
```

#### 单链表的初始化

```c
//方法一，在初始化时头指针指向头结点
void Init(LinkedList head, ElemType data)
{
    head = CreateNode(data);
}
//初始化2：头指针置为空
void Init(LinkedList *head)
{
    *head = NULL;
}
//或
LNode* Init()
{
    return NULL;
}
```

<mark>代码说明2</mark>

<div>
    <ol>
        <li>使用方法一初始化，我们在写其他函数时，可以不使用双重指针。</li>
        <li>使用方法二初始化，我们在写其他函数时，需要使用双重指针。</li>
    </ol>
</div>


问题3：<font size = 2px, color = "#ff0f">能够阐述代码说明2的原因吗？</font>

在回答问题3之前，我们先看一下下面这个例子

```c
//交换函数swap1
void swap1(int *a, int *b)
{
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
//交换函数swap2
void swap2(int *a, int *b)
{
    int *tmp = *a;
    *a = *b;
    *b = *tmp;
}

int main()
{
    int a = 3;
    int b = 4;
    swap1(&a, &b);
    swap2(&a, &b);
}
```

分析：调用swap1，改变的是指针变量的值，可以交换两个数的值；调用swap2，不能交换两个数的值，由于未给指针变量tmp赋值，所以指针变量的值是不可预见的。

<mark>注意</mark>：因为在C语言中实参变量和形参变量之间的数据传递是单向的“值传递”方式。

答案：当我们使用<mark>方法二</mark>初始化时，头指针会被初始化为NULL，而当我们使用`L->next`时，我们并未初始化`L->next`，我们只是初始化了`L = NULL`，就如swap2中的tmp是一样的。同时，在函数内为一个空指针开辟开辟空间是无法带回函数外部的。使用<mark>方法一</mark>初始化时，`L->next = NULL`。

如果我们不想使用双重指针，用方法二初始化时，我们可以这样：

```c
int main()
{
    LinkedList head = Init();
    ElemType data;
    scanf("%d", &data);
    head = CreateNode(data);
}
```

当然这样做与方法一无异。当我们只是想要一个空链表时，我们使用方法二初始化链表；当我们不在意初始化时链表有头结点，可以使用方法二初始化。

<mark>说明</mark>：二重指针：传入一个指针的地址，此时是作为地址上的值让我们修改。

#### 单链表的头插法

> 在头结点前插入节点

```c
// head != NULL;
void PushFront(LinkedList head, ElemType data)
{
    LNode *node = CreateNode(data);
    LNode *pn = head;				//创建指针变量pn，赋初值为head的地址
    node->next = pn->next;			//node指向pn的下一个结点
    pn->next = node;				//pn指向node
}

//*head == NULL
void PushFront(LinkedList *head, ElemTypedata)
{
    assert(head != NULL);
    LNode *node = CreateNode(data);
    LNode **ppn = head;
    node->next = *ppn;
    *ppn = node;
}
```

<mark>代码说明3</mark>

1. 创建node结点时，node指向的是NULL，若pn直接指向node，会造成数据的丢失。
2. 注释`head != NULL`与`*head == NULL`指的是链表的初始状态.(全文都是)

#### 单链表的尾插法

> 在链表尾部插入结点

```c
// head != NULL;
void PushBack(LinkedList head, ElemType data)
{
    LNode *node = CreateNode(data);
    LNode *pn = head;
    //遍历链表,直至尾结点，即pn->next == NULL
    while(pn->next)
    {
        pn = pn->next;				//pn指向下一个结点（即将pn下一个结点的地址赋给pn)
    }
    pn->next = node;				//pn指向node
}

//*head == NULL
void PushBack(LinkedList *head, ElemType data)
{
    LNode* node = CreateNode(data);
    LNode **ppn = head;
    LNode *pn = *head;

    while(pn->next)
    {
        ppn = &pn->next;
        pn = pn->next;
    }
    (*ppn)->next = node;
}
```

#### 在给定位置，插入结点

> 遍历链表，在指定下标插入结点。

```c
// head != NULL;
void Insert(LinkedList head, int pos, ElemType data)
{
    assert(pos >= 0);
    LNode *node = CreateNode(data);
    LNode *pn = head;
    //遍历到要插入的位置
    while(pn->next && pos)
    {
        pn = pn->next;
        pos--;
    }
    if(!pn || pos) return;
    node->next = pn->next;
    pn->next = node;
}
// *head == NULL;
void Insert(LinkedList *head, int pos, ElemType data)
{
    assert(head != NULL && pos >= 0);
    LNode **ppn = head;
    LNode *pn = *head;
    LNode *node = CreateNode(data);
    if(pos == 0)
    {
        PushFront(head, data);
        return;
    }
    while(pn->next && 1 < pos)
    {
        ppn = &pn->next;
        pn = pn->next;
        pos--;
    }
    if(!pn || 1 < pos) return;
    node->next = (*ppn)->next;
    (*ppn)->next = node;
}
```

<mark>代码说明4</mark>

1. 两段代码中为什么while循环pos的终止条件不一致？

   （1）当初始化链表后，向链表中插入两个结点时，对于代码段1，其实有3个结点（原因，头指针在创建，指向了一个结点）。对于代码段2，只有两个结点。

   （2）对于代码段1，指针变量pn的pos为-1(原因：(1) 中已说明）， pos = 1，插入的位置为`pn->next->next`。

   （3）对于代码段2，指针变量pn的pos为0，pos = 1，即插入的位置为`pn->next`。若终止条件为`pos = 0`；进入while循环后，插入的位置其实是`pn->next->next`

对于代码段2，也可以这样写：

```c
void Insert(LinkedList *head, int pos, ElemType data)
{
    assert(head != NULL && pos >= 0);
    LNode **ppn = head;
    LNode *pn = *head;
    LNode *node = CreateNode(data);
    while(pn->next && pos)
    {
        ppn = &pn->next;
        pn = pn->next;
        pos--;
    }
    if(!pn || pos) return;
    node->next = *ppn;
    *ppn = node;
}
```

由代码说明4可知，pn的位置是我们要插入的位置，将结点插入pn前面即可。

#### 单链表的头删法

> 删除头结点，头指针指向头结点的下一个结点。

```c
//head != NULL
void PopFront(LinkedList head)
{
    assert(head != NULL);
    LNode *pn = head;
    head = pn->next;
}

//*head == NULL
void PopFront(LinkedList *head)
{
    assert(head != NULL);
    assert(*head != NULL);
    LNode *pn = *head;
    *head = pn->next;
    free(pn);
}

//或。
void PopFront(LinkedList *head)
{
    assert(head != NULL);
    assert(*head != NULL);
    *head = (*head)->next;
}
```

<mark>注意</mark>	对于代码段3并不推荐，因为会造成内存的泄露，我们只是丢失了头结点的地址，并没有释放这个结点，所以这个结点依然存在。如果追求短小精悍，可以使用。

#### 单链表的尾删法

> 删去链表的最后一个结点

```c
//head != NULL
void PopBack(LinkedList head)
{
    assert(head != NULL);
    if(head->next == NULL) return;
    LNode *pn = head;
    while(pn->next->next != NULL)
    {
        pn = pn->next;
    }
    free(pn->next);
    pn->next = NULL;
}
//head == NULL
void PopBack(LinkedList *head)
{
    assert(head != NULL);
    assert(*head != NULL);
    if((*head)->next == NULL)
    {
        free(*head);
        *head = NULL;
        return;
    }
    LNode *pn = *head;
    while(pn->next->next != NULL)
    {
        pn = pn->next;
    }
    free(pn->next);
    pn->next = NULL;
}
```

<mark>代码说明6</mark>

1.两个代码段的 if语句执行的内容不同，是由链表的初始化决定的（换句话说链表为空的条件），对于代码段一，链表初始化时不能为空，必须初始化一个头结点。对于代码段二，链表可以为空。

#### 删除指定位置的结点

> 遍历至要被删除的结点，删除结点。

```c
//head != NULL
void Erase(LinkedList head, int pos)
{
    LNode *pn = head;
    while(pn->next && pos)
    {
        pn = pn->next;
        pos--;
    }
    if(pos || !pn->next) return;
    LNode *tmp = pn->next;
    pn->next = tmp->next;
    free(tmp);
}
// *head == NULL
void Erase(LinkedList *head, int pos)
{
    assert(head != NULL && pos >= 0);
    LNode **ppn = head;
    LNode *pn = *head;
    while(pn->next && pos)
    {
        ppn = &pn->next;
        pn = pn->next;
        pos--;
    }
    if(!pn || pos) return;
    LNode *tmp = (*ppn);
    (*ppn) = tmp->next;
    free(tmp);
}
```

理解了**在指定位置，插入结点**后，应该不难理解。

#### 按值查找

> 给定值，遍历链表，返回值对应的结点，没找到返回

```c
LNode* Find(LinkedList head, ElemType data)
{
    LNode* tmp = head;
    while(tmp != NULL && tmp->data != data)
    {
        tmp = tmp->next;
    }
    if(tmp == NULL){
        printf("查找的值不存在！！！\n");
    }
    return tmp;
}
```

#### 给定下标，查找值

> 遍历链表至给定下标，返回结点的值。不存在返回-1.

```c
ElemType indexOf(LinkedList head, int index)
{
    if(index < 0) return -1;
    //tmp初始化为头结点的下一个结点，是因为当前头结点初始化时附带的，并非真正意义上的头结点。
    LNode *tmp = head->next;
    //若链表初始化为空, LinkedList tmp = head即可。
    while(tmp && index)
    {
        tmp = tmp->next;
        index--;
    }
    if(tmp && !index) return tmp->val;
    else return -1;
}
```



#### 遍历链表

```c
//head != NULL
void TraverseList(LinkedList head)
{
    //tmp初始化为头结点的下一个结点，是因为当前头结点初始化时附带的，并非真正意义上的头结点。
    LNode *tmp = head->next;
    //若链表初始化为空, LinkedList tmp = head即可。
    while(tmp->next != NULL)
    {
        printf("%d--->", tmp->data);
        tmp = tmp->next;
    }
    printf("%d\n", tmp->data);
}
```

#### 销毁链表

> 释放链表每个结点的空间

```c
void Destroy(LinkedList head)
{
    LNode *del = NULL;
    while(head)
    {
        del = head;
        head = head->next;
        free(del);
    }
}
```

## 练习

1. <a href="https://leetcode-cn.com/problems/design-linked-list/" target="_blank">设计链表</a>

2. <a href="https://leetcode-cn.com/problems/merge-two-sorted-lists/" target="_blank">合并两个有序链表</a>

3. <a href="https://leetcode-cn.com/problems/reverse-linked-list/" target="_blank">反转链表</a>