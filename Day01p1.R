library(dplyr)
setwd(dirname(sys.frame(1)$ofile))
indata <- read.csv("input.txt", header=FALSE)
indata %>% mutate(fuel=trunc(V1/3)-2) %>% summarize(sum(fuel))