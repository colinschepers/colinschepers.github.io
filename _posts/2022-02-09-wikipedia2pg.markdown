---
layout: post 
title:  "Extracting Wikipedia dumps to Postgres"
date:   2022-02-09 20:41:13 +0100 
categories: [Databases, Postgres, Python]
tags: [Databases, Postgres, Python, Compression, SQL, XML, Wikipedia, Regex]
--- 
This article is about my python tool that extracts Wikipedia dumps from your local system or online, and imports them
into [Postgres](https://www.postgresql.org/) [1]. It's easy to use and insanely fast.

## Supported Data

Wikimedia provides public [dumps](https://dumps.wikimedia.org/enwiki/latest/) [2] of the wikis' content and related
data. The dumps are free to download and reuse. Currently, this application only supports the following data, but the
code is set up to be extended with little effort:

| Entity     | Type | File                                                                                                                                          |
|------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| Page       | sql  | [enwiki-latest-page.sql.gz](http://dumps.wikimedia.org/enwiki/latest/enwiki-latest-page.sql.gz)                                               |
| Pagelink   | sql  | [enwiki-latest-pagelinks.sql.gz](http://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pagelinks.sql.gz)                                     |                                                                                                  | Text        |
| Redirect   | sql  | [enwiki-latest-redirect.sql.gz](http://dumps.wikimedia.org/enwiki/latest/enwiki-latest-redirect.sql.gz)                                       |
| Abstract   | xml  | [enwiki-latest-abstract.xml.gz](http://dumps.wikimedia.org/enwiki/latest/enwiki-latest-abstract.xml.gz)                                       |
| Article    | xml  | [enwiki-latest-pages-articles-multistream.xml.bz2](http://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pages-articles-multistream.xml.bz2) |

See [Wikimedia](https://meta.wikimedia.org/wiki/Data_dumps/What%27s_available_for_download) [3] for a more detailed
description of each entity.

## Implementation

The code is set up as follows. After creating a PostgresConnection instance using the credentials from the
[`config.yaml`](https://github.com/colinschepers/wikipedia2pg/blob/main/config.yaml) or the script arguments, it is
passed to an extractor. Each entity (see previous section) has its own extractor that takes care of using the correct
sql scripts, going to the correct source file and how it should process the data. Each of these extractors inherit from
either a
[`SqlExtractor`](https://github.com/colinschepers/wikipedia2pg/blob/main/wikipedia2pg/extractors/sql.py) or a
[`XmlExtractor`](https://github.com/colinschepers/wikipedia2pg/blob/main/wikipedia2pg/extractors/xml.py), which in turn
inherit from an abstract
[`BaseExtractor`](https://github.com/colinschepers/wikipedia2pg/blob/main/wikipedia2pg/extractors/__init__.py). This is
done to minimize code duplication and maximize extensibility.

Extracting records for sql based entities is pretty straightforward. The insert statements in the source sql file are
matched using a regex [4] and sql dialect specific characters are replaced. The resulting string will be used to insert
the record in the postgres database. Extracting records from xml file is done using the
[`xml.etree.ElementTree`](https://docs.python.org/3/library/xml.etree.elementtree.html) module [5]. The extractors for
xml based entities have to define what xml tag contains the important data for a record and how to parse the xml
element.

When an extraction of an entity is started, the corresponding init sql script in
[`wikipedia2pg/postgres/sql/`](https://github.com/colinschepers/wikipedia2pg/tree/main/wikipedia2pg/postgres/sql) is
executed. A postgres table is created for that entity if it does not yet exist, and indexes from a previous extraction
are removed to increase insert speeds. If the compressed dump file for the entity is not found in the data folder, it
will be automatically downloaded to disk showing the status in a progress bar. The records from the xml or sql file in
the dump are parsed, using a generator to stream the data to prevent memory issues. If records are already present in
the database, it will skip this number of records. The records will be committed to the database in batches. After
processing all data the finish sql script is executed, which contains database alterations like creating a primary key
and indexes.

You can find the source code of the application at my personal [GitHub](https://github.com/colinschepers/wikipedia2pg).

## Sources

1. [https://www.postgresql.org/](https://www.postgresql.org/)
2. [https://dumps.wikimedia.org/enwiki/latest/](https://dumps.wikimedia.org/enwiki/latest/)
3. [https://meta.wikimedia.org/wiki/Data_dumps/What%27s_available_for_download](https://meta.wikimedia.org/wiki/Data_dumps/What%27s_available_for_download)
4. [https://www.regular-expressions.info/](https://www.regular-expressions.info/)
5. [https://docs.python.org/3/library/xml.etree.elementtree.html](https://docs.python.org/3/library/xml.etree.elementtree.html)