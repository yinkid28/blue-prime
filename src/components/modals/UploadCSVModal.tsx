import React, { useCallback, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  Icon,
  Text,
  Box,
  Input,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { UploadCSVModalProps } from "@/models/api.model";


const UploadCSVModal = ({ isOpen, onClose }: UploadCSVModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const modalSize = useBreakpointValue({ base: "90%", md: "500px" });
  const modalHeight = useBreakpointValue({ base: "auto", md: "402px" });
  const iconSize = useBreakpointValue({ base: 6, md: 8 });
  const fontSize = useBreakpointValue({ base: "xs", md: "sm" });

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setError(null);
      }
      if (fileRejections.length > 0) {
        setError("Only CSV files are supported.");
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  } as DropzoneOptions);

  const handleBrowseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    document.getElementById("fileInput")?.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        className="bg-light-grey p-2"
        w={modalSize}
        h={modalHeight}
        bg="#F8F8F8"
      >
        <ModalHeader
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="semibold"
          color="gray.500"
          p={4}
          pt={6}
          pb={4}
        >
          Import CSV
        </ModalHeader>
        <ModalCloseButton
          as={IoMdClose}
          position="absolute"
          top={{ base: 4, md: 7 }}
          right={{ base: 2, md: 4 }}
          size="sm"
          bg="transparent"
          color="gray.400"
          _hover={{ bg: "gray.100" }}
          sx={{
            borderRadius: "full",
            border: "1px solid gray",
            borderColor: "gray.400",
          }}
        />
        <ModalBody p={4} className="rounded-lg bg-white">
          <Box
            {...getRootProps()}
            borderWidth={1}
            borderStyle="dashed"
            borderColor={error ? "red.400" : "gray.300"}
            borderRadius="md"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            p={2}
          >
            <Input
              type="file"
              id="fileInput"
              display="none"
              {...(getInputProps() as any)}
            />
            <Center flexDirection="column">
              <Icon as={FiUploadCloud} w={iconSize} h={iconSize} color="gray.400" />
              <Flex align="center" mt={2} flexDirection={{ base: "column", md: "row" }}>
                <Text fontSize={fontSize} color="gray.500" mr={{ base: 0, md: 2 }} textAlign="center">
                  {file
                    ? file.name
                    : isDragActive
                    ? "Drop the CSV file here"
                    : "Upload CSV file."}
                </Text>
                {!file && !isDragActive && (
                  <Text
                    as="span"
                    color="blue.500"
                    cursor="pointer"
                    onClick={handleBrowseClick}
                    fontSize={fontSize}
                    mt={{ base: 2, md: 0 }}
                  >
                    Browse files
                  </Text>
                )}
              </Flex>
              {error && (
                <Text color="red.500" fontSize={fontSize} mt={2}>
                  {error}
                </Text>
              )}
            </Center>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UploadCSVModal;

