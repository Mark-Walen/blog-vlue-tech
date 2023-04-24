---
headerDepth: 4
author: Mark Walen
category: 数据结构
---
# 栈

## 顺序栈

### 定义

> **栈** 仅限定在表尾进行插入或删除操作的线性表，是一种**后进先出**的数据结构

![栈](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/06/03/screen-shot-2018-06-02-at-203523.png)

<center><font size="2px">图1.1 栈 (来源：<a href="https://leetcode-cn.com/leetbook/read/queue-stack/ghqur/">leetcode</a>)</font></center>

### 存储结构

我们通过移动栈顶指针(top)进行相关的数据操作，用线性结构(如数组、链表等)存储栈的元素

顺序栈的表示：

```c
#define MAXSIZE 100			//顺序栈存储空间的初始分配量

typedef int ElemType;
typedef struct
{
    ElemType *base;			//存储栈元素
    int top;				//栈顶指针
}
```



严蔚敏书中的定义：

```c
#define MAXSIZE 100				//顺序栈存储空间的初始分配量

typedef int SElemType;
typedef struct
{
    ElemType *base;				//存储栈元素
    ElemType *top;				//栈顶指针
    int stacksize;				//栈可用的最大容量
}
```

<mark>说明1</mark>

1. 栈底指针base始终指向栈底的位置，若base的值为NULL，表明栈结构不存在
2. top为栈顶指针，其初值指向栈底，即`top = base`
    1. 向栈顶插入新的元素时，指针top增1（前提：栈未满）
    2. 删除栈顶元素时，指针top减1（前提：栈不为空）

### 基本操作

:warning: <span style="background-color:red; color:#f2f2f2">栈只能在栈顶进行一系列操作。</span>

> 入栈`push_back`(插入操作)、出栈`pop_back`(删除操作)、栈空的判断(`isEmpty`)、取栈顶元素(`getTop`)

#### 初始化

<mark>定义</mark> 为顺序栈动态分配一个预定义大小的数组空间。

<mark>动画</mark>

<img src="/assets/img/stack/Init.gif" alt="InitStack" style="zoom:500%;" />

<center><font size="2px">图2.1 初始化栈</font></center>

<mark>实现</mark> 点击 [:arrow_right:](#初始化栈)，查看。

#### 入栈

<mark>定义</mark> 入栈操作是指在栈顶插入一个新的元素

<mark>动画</mark>

![insert-stack](/assets/img/stack/push.gif)

<mark>实现</mark> 点击 [:arrow_right:](#入栈-2)，查看。

#### 出栈

<mark>定义</mark> 将栈顶元素删除

<mark>动画</mark>

![pop-back](/assets/img/stack/pop.gif)

<mark>实现</mark> 点击 [:arrow_right:](#出栈-2)，查看。

### 用数组模拟栈

#### 动态数组模拟栈

> 动态数组：动态数组的内存空间是从堆动态分配的。是通过执行代码(关键字：`malloc`, `calloc`, `realloc)`而为其分配存储空间。[详情](https://blog.csdn.net/zhanshen112/article/details/80758850)

```c
#define MAXSIZE 100

typedef int ElemType;
int top;	//栈顶指针
ElemType * InitStack();							//初始化栈
void PushBack(ElemType *stack, ElemType data);	//入栈
ElemType PopBack(ElemType *stack);				//出栈
ElemType GetTop(ElemType *stack);				//取栈顶元素
int isEmpty();									//判断栈为空

ElemType* InitStack()
{
	ElemType *stack = (ElemType *)malloc(sizeof(ElemType)*MAXSIZE);
    top = 0;
    return stack;
}

void PushBack(ElemType *stack, ElemType data)
{
    if (top == MAXSIZE) return;		//栈满则不能插入
    stack[top++] = data;
}

ElemType PopBack(ElemType *stack)
{
    if (top == 0) return -1;		//栈为空
    return stack[--top];
}

ElemType GetTop(ElemType *stack)
{
    return stack[top-1];
}

int isEmpty()
{
    //初始化栈
    return top == 0;
}

int main()
{
    //初始化栈1;
    ElemType *stack = InitStack();
    //初始化栈2;
    //ElemType *stack = (ElemType *)malloc(sizeof(ElemType)*MAXSIZE);
    //top = 0;
    free(stack);	//动态分配的空间记得释放。
    return 0;
}
```

<mark>小结</mark>

1. 用数组实现栈比较方便，容易实现。
2. 可以使用静态数组模拟栈(实现见[附录](#静态数组))
    1. 定义初始化一个静态数组，并定义一个下标(top = 0)模拟栈顶指针;
    2. 向栈中插入元素`top++`，删除元素`--top`；
    3. 栈为空即`top=0` 栈满top值等于初始化时数组的长度。
3. 用数组模拟栈，进行删除操作时，其实需要删除的元素(设下标为del )并未删除，当我们去遍历整个数组（即栈区: `[0, top]` + 非栈区：`[top+1, stackSize]`）时依然可以看见stack[del]. 当我们再次插入元素(`top = del`)时，下标`del`处的值会被覆盖重写。

### 用结构体实现

> 本文用上述[存储结构](#存储结构)中第一种定义的结构体实现。

<mark>Tips</mark> 当然也可以根据自己的需求定义相应栈的结构体。

#### 相关头文件

<span id="header">`stack.h`</span>

```c
#ifndef STACK_H_INCLUDED
#define STACK_H_INCLUDED

#define MAXSTACKSIZE 100
typedef int ElemType;

typedef struct
{
    ElemType *base;				//用于存储数据
    int top;					//栈顶指针，栈尾指针默认为下标0
}SeqStack;

void InitStack(SeqStack *stack);                 //初始化栈
void Destroy(SeqStack *stack);                   //销毁栈
void ClearStack(SeqStack *stack);                //清空栈
int Empty(SeqStack stack);                      //判断栈是否为空
int length(SeqStack stack);                     //获取栈元素的个数
ElemType GetTop(SeqStack stack);                //获取栈顶元素
void PushBack(SeqStack *stack, ElemType data);    //栈顶插入元素
ElemType PopBack(SeqStack *stack);                //删除栈顶元素，并返回
void Traverse(SeqStack stack);                   //遍历栈


#endif // STACK_H_INCLUDED
```

#### 初始化栈

```c
void InitStack(SeqStack *stack)
{
    stack->base = (ElemType *)malloc(sizeof(ElemType)*MAXSIZE);		//为栈申请空间
    if(!stack->base) return;	//分配失败，终止。当然我们也可以修改函数的返回类型，了解分配情况。
    stack->top = 0;
}

//返回SeqStack *类型
SeqStack *InitStack()
{
    SeqStack *stack;
    stack->base = (ElemType *)malloc(sizeof(ElemType)*MAXSIZE);		//为栈申请空间
    if(!stack->base) return;	//分配失败，终止。当然我们也可以修改函数的返回类型，了解分配情况。
    stack->top = 0;
    return stack;
}
```

<mark>说明1</mark>

对于严蔚敏书中的实现：

1. 由于c语言中不能使用引用类型(&)作为函数形式参数使用，所以改用指针。但在调用函数传递实参时可以使用（C语言中是取地址符），因为传入的是变量的地址。

   以**初始化栈函数为例**：`SeqStack stack; InitStack(&stack);`

2. 栈顶指针：`*top` | 栈尾指针：*base。

   top初始化为base：`stack->top = stack->base`表示栈为空。

   <font color="red">解释</font>：<font size="3px" color="#333">当两个指针指向同一个数组时，它们可以相减，其为结果为两个指针之间的元素数目。</font>

#### 入栈

```c
void PushBack(SeqStack *stack, ElemType data)
{
	//判断栈是否已满
    if(stack->top < MAXSTACKSIZE)
    {
        stack->base[stack->top++] = data;
    }
    else
    {
        printf("stack overflow!!!\n");
    }
}
```

<mark>说明2</mark>

对于严蔚敏书中的实现：

1. 函数定义`Status Push(SqStack *stack, SElemType e);`

2. 元素入栈:

    1. `*(stack->top) = e;stack->top++;`

       <font color="red">解释</font>：<font size="3px" color="#333">定义变量a：`int *a`，`stack->top` 相当于`a` (`*(stack->top)`相当于`*a`)。 </font>

    2. 不能这样赋值：`stack->top = &e;`。

       <font color="red">解释</font>：这样会把`e`的地址值赋给`stack->top`。`stack->top`与`stack->base`指向的不是同一个数组，即`stack->top - stack->base`不能用来判断栈空或栈满。

#### 出栈

```c
ElemType PopBack(SeqStack *stack)
{
	//判断栈是否为空
    if(!Empty(*stack))	//? stack->top = 0
    {
        //可以简化为 return stack->base[--stack->top];
        ElemType data = stack->base[--stack->top];
        return data;
    }
    else
    {
        printf("stack is empty!!!\n");
    }
    return -1;
}
```

<mark>说明3</mark>

对于严蔚敏书中的实现：

1. 函数定义 ①`Status Pop(SqStack *stack, ElemType *e);`或②`ElemType Pop(SqStack *stack)`

2. 函数出栈

    1. ①：`e = --stack->top;`

       <font color="red">解释</font>：将--s->top(栈顶)的地址值赋给e。

    2. ②：`return *(--stack->top);`

#### 取栈顶元素

```c
ElemType GetTop(SeqStack *stack)
{
    if (stack->top != 0) return *(stack->top - 1);
    return -1;	//栈为空，返回-1;
}
```

<span style="background-color:yellow; color: #333;">写在最后</span> 栈的基本操作已实现，对于[stack.h](#header)中未实现的函数，可以自己尝试去实现，感谢你的阅读。

### 附录

#### 静态数组模拟栈

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int stack[stackSize];	//stackSize：栈的长度，请自行定义并初始化。
    int top = 0;
    
    //k in [1, stackSize]
    for (int i = 0; i < k; i++)
    {
        stack[top++] = i*i + 3;		//插入元素
    }
    printf("删除的元素：%d\n", stack[--top]);
    printf("栈顶元素：%d\n", stack[top-1]);
	return 0;
}
```

<mark>思考</mark> 当删除元素时，一定是`--top`吗？

回答：其实`--top` 与 `top--`两者皆可。top的含义：栈顶指针以及栈中元素的个数。数组的下标是从0开始的，所以栈顶元素的值：`stack[top-1]`。我们知道删除元素是删除栈顶元素（设下标为`del = top-1`），当我们需要使用这个元素时（如作为返回值、输出或其它用途）推荐使用`--top`(`top = del`)，当然使用 `top--`也可以(① `top--;stack[top];` 或 ②`stack[top-1]; top--；`)

### 练习

1. [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

2. [逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

3. [验证栈序列](https://leetcode-cn.com/problems/validate-stack-sequences/)