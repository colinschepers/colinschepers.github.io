---
layout: post 
title:  "Yet another year ended with Advent of Code"
date:   2022-12-30 16:45:31 +0100 
categories: [AI, Algorithms, Python]
tags: [AI, Algorithms, Python]
--- 
As already described in [previous year's post](/2021/adventofcode/) about Advent of Code [1], it is an advent calendar
of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming
language. Some people use it for programming practice, others as a speed contest or to challenge each other. I'm
interested in creating the most efficient algorithm, while keeping the code as clean and readable as possible.
Additionally, I like learning new techniques and python tricks while doing so!

Using pytest [2] in combination with its parametrize feature [3] and unittest's mock library [4], each algorithm is
executed given the actual inputs from the website and are checked whether they finish in a reasonable amount of time.
The running times of my algorithms of the last two years summed up to about half a minute. The challenges of this year
added a mere 8 seconds and with a few optimizations in last year's algorithms, I am able to solve all 75 challenges of
the last 3 years in about half a minute on my private laptop with decent specifications. Not too bad!

<p><div style="text-align:center;"><iframe src="https://colinschepers.github.io/AdventOfCode/tests/results/test_running_times_2022.html" width="100%" height="400pt"></iframe></div></p>

You can find the source code at my personal [GitHub](https://github.com/colinschepers/AdventOfCode).

## Sources

1. [https://adventofcode.com/](https://adventofcode.com/)
2. [https://pytest.org/](https://pytest.org/)
3. [https://docs.pytest.org/en/6.2.x/parametrize.html](https://docs.pytest.org/en/6.2.x/parametrize.html)
4. [https://docs.python.org/3/library/unittest.mock.html](https://docs.python.org/3/library/unittest.mock.html)
