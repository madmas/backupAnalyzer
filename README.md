# BackupAnalyzer

Getting to know what takes up space in you backup.

This is just a quick implementation to parse and vizualize the output of 

```
borg list  $BORG_REPO::backupname-2021-06-20T05:00:28 > backupsize.log 
cat backupsize.log  | awk '{print $4 " "  $8}' > size-filename.log
```

That way I got something similar to `ncdu` to realize what might be eating up my backup space ;-). It does not take into account the deduplication featuers of borg backup, tho.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
