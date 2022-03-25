---
layout: post
title:  "Challenging yourself with Advent of Code"
date:   2022-01-08 12:11:51 +0100
categories: [AI, Algorithms, Python]
tags: [AI, Algorithms, Python]
--- 
Advent of Code [1] is an advent calendar of small programming puzzles for a variety of 
skill sets and skill levels that can be solved in any programming language. Every day
from the first of December until the first day of Christmas a new challenge is released
on the website. Some people use them for programming practice while others are using it 
as a speed contest or to challenge each other. 

Personally, I'm not interested in solving the puzzles as fast as possible (they are released
6 a.m. local time which is way too early for me anyway), but aim to create an algorithm 
that most efficiently solves the problem, while keeping the code as clean and readable as 
possible. Additionally, I like learning new techniques and python tricks while doing so!

## Source Code

The Python application contains algorithms to solve the challenges of Advent of Code 2020 and 2021. 
Additionally, there are unit tests to test the validity of the solutions and the performance of 
each algorithm. You can find the source code at my personal 
[GitHub](https://github.com/colinschepers/AdventOfCode).

## Testing validity

Using pytest [2] in combination with its parametrize feature [3] and unittest's mock library [4], each algorithm
is given an example (as given on the website for the specific problem) and checks if the 
expected output is returned. 

<p><div style="text-align:center;"><iframe src="https://colinschepers.github.io/AdventOfCode/tests/results/test_examples.html" width="100%" height="400pt"></iframe></div></p>

## Measuring performance

With a similar testing framework as described in the previous section, each algorithm is executed given 
the actual inputs from the website and are checked whether they finish in a reasonable amount of time. On my private
laptop with decent specifications all 50 algorithms finish in approximately half a minute. 

<p><div style="text-align:center;"><iframe src="https://colinschepers.github.io/AdventOfCode/tests/results/test_running_times.html" width="100%" height="400pt"></iframe></div></p>

## Sources

1. [https://adventofcode.com/](https://adventofcode.com/)
2. [https://pytest.org/](https://pytest.org/)
3. [https://docs.pytest.org/en/6.2.x/parametrize.html](https://docs.pytest.org/en/6.2.x/parametrize.html)
4. [https://docs.python.org/3/library/unittest.mock.html](https://docs.python.org/3/library/unittest.mock.html)
