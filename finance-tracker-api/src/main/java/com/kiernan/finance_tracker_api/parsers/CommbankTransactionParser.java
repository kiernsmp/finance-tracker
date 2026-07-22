package com.kiernan.finance_tracker_api.parsers;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.ArrayList;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;
import com.kiernan.finance_tracker_api.dto.TransactionRequestDto;

public class CommbankTransactionParser implements TransactionParser {
    
    @Override
    public List<TransactionRequestDto> parse(MultipartFile file) {

    List<TransactionRequestDto> records = new ArrayList<>();

        try (Reader reader = new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8);
            CSVParser parser = CSVFormat.DEFAULT.parse(reader)) {

                for (CSVRecord record : parser) {
                    String[] notes = record.get(2).split("   ", 2);

                    if (notes.length == 2 ) {
                        notes[1] = notes[1].trim().replaceAll(" {2,}",", ");
                        records.add(
                            new TransactionRequestDto(record.get(0), record.get(1), notes[0].trim(), notes[1].trim())
                        );
                    }
                    else {
                        records.add(
                            new TransactionRequestDto(record.get(0), record.get(1), notes[0].trim(), null)
                        );
                    }
                }

                return records;

            } catch (IOException e) {
                throw new RuntimeException("Failed to parse CSV", e);
            }

    }
}
